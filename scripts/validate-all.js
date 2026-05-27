import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fail = [];

function readJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
  } catch (error) {
    fail.push(`${rel} is invalid JSON: ${error.message}`);
    return null;
  }
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

const index = readJson('skills.json');
const pkg = readJson('package.json');

if (!exists('LICENSE')) fail.push('missing root LICENSE');
if (!exists('SECURITY.md')) fail.push('missing root SECURITY.md');
if (!exists('README.md')) fail.push('missing root README.md');

if (pkg && pkg.license !== 'MIT') fail.push('root package.json license must be MIT');

if (index) {
  const ids = new Set();
  const slugs = new Set();

  for (const skill of index.skills || []) {
    if (!skill.id || !skill.slug || !skill.path || !skill.title) {
      fail.push('skill index entry missing id/slug/path/title');
      continue;
    }

    if (ids.has(skill.id)) fail.push(`duplicate skill id: ${skill.id}`);
    if (slugs.has(skill.slug)) fail.push(`duplicate skill slug: ${skill.slug}`);
    ids.add(skill.id);
    slugs.add(skill.slug);

    for (const rel of ['skill.json', 'README.md', 'sources.json', 'scripts/validate.js']) {
      if (!exists(path.join(skill.path, rel))) fail.push(`missing ${rel} for ${skill.slug}`);
    }

    const skillJsonPath = path.join(skill.path, 'skill.json');
    if (exists(skillJsonPath)) {
      const skillJson = readJson(skillJsonPath);
      if (skillJson) {
        if (skillJson.id !== skill.id) fail.push(`skill id mismatch for ${skill.slug}`);
        if (skillJson.version !== skill.version) fail.push(`skill version mismatch for ${skill.slug}`);
        if (!skillJson.safety_posture?.authorized_testing_only) {
          fail.push(`skill missing authorized_testing_only safety posture: ${skill.slug}`);
        }
      }
    }
  }
}

if (fail.length) {
  console.error('Validation failed:');
  for (const item of fail) console.error('- ' + item);
  process.exit(1);
}

const skills = index?.skills || [];
for (const skill of skills) {
  const validator = path.join(root, skill.path, 'scripts', 'validate.js');
  const result = spawnSync(process.execPath, [validator], {
    cwd: root,
    stdio: 'inherit'
  });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log(JSON.stringify({
  ok: true,
  skills: skills.length,
  validated: skills.map((skill) => skill.slug)
}, null, 2));
