import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fail = [];

function read(rel) { return fs.readFileSync(path.join(root, rel), 'utf8'); }
function exists(rel) { return fs.existsSync(path.join(root, rel)); }
function resolveRel(fromRel, target) { return path.normalize(path.join(root, path.dirname(fromRel), target)); }
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name).replace(/\\/g, '/');
    if (entry.isDirectory()) out.push(...walk(rel));
    else out.push(rel);
  }
  return out;
}

let skill;
try { skill = JSON.parse(read('skill.json')); } catch (error) { fail.push('skill.json is invalid JSON: ' + error.message); }
let sources;
try { sources = JSON.parse(read('sources.json')); } catch (error) { fail.push('sources.json is invalid JSON: ' + error.message); }
let proceduralMemory;
try { proceduralMemory = JSON.parse(read('docs/procedural-memory/card-matrix.json')); } catch (error) { fail.push('procedural memory matrix is invalid JSON: ' + error.message); }

if (skill) {
  for (const rel of Object.values(skill.documents || {})) {
    if (!exists(rel)) fail.push('missing document referenced by skill.json: ' + rel);
  }
  if (!skill.signal_classes?.includes('request_smuggling_desync_surface')) {
    fail.push('missing signal class: request_smuggling_desync_surface');
  }
  if (!skill.retrieval_guidance?.avoid_loading_all_memory_cards) {
    fail.push('missing retrieval guidance to avoid loading all memory cards');
  }
  if (!skill.retrieval_guidance?.use_procedural_memory_matrix_for_complete_context) {
    fail.push('missing retrieval guidance for complete procedural-memory context');
  }
}

if (Array.isArray(sources)) {
  const ids = new Set();
  for (const source of sources) {
    if (!source.id || !source.url || !source.title) fail.push('source missing id/title/url: ' + JSON.stringify(source));
    if (ids.has(source.id)) fail.push('duplicate source id: ' + source.id);
    ids.add(source.id);
  }
  if (ids.size < 50) fail.push('expected at least 50 unique sources');
}

if (proceduralMemory) {
  const preservation = proceduralMemory.preservation || {};
  const minimumExpected = {
    original_card_count: 360,
    variant_count: 18,
    surface_count: 20,
    candidate_impact_count: 10,
    initial_signal_count: 60,
    required_evidence_count: 54,
    primary_false_positive_count: 54,
    safety_gate_count: 38,
    context_group_count: 111
  };
  const requiredNewVariants = [
    'TE.0 / dechunking smuggling',
    'chunked parser differentials',
    'h2c cleartext upgrade smuggling',
    'HTTP/3 connection contamination',
    'TRACE-assisted desync gadget',
    'opportunistic TLS / RFC 2817 desync'
  ];

  if (proceduralMemory.schema_version !== 'request-smuggling-procedural-memory/v1') {
    fail.push('unexpected procedural memory schema_version');
  }
  if (!proceduralMemory.common_objective_question) fail.push('procedural memory missing common objective question');
  if (!proceduralMemory.common_expected_output) fail.push('procedural memory missing common expected output');

  if (preservation.original_card_count !== minimumExpected.original_card_count) {
    fail.push(`procedural memory original preservation mismatch: expected ${minimumExpected.original_card_count}, found ${preservation.original_card_count}`);
  }

  const ids = new Set();
  const variants = new Set();
  const surfaces = new Set();
  const impacts = new Set();
  const signals = new Set();
  const evidences = new Set();
  const falsePositives = new Set();
  const safetyGates = new Set();
  let caseCount = 0;
  let groupCount = 0;

  for (const variant of proceduralMemory.variants || []) {
    variants.add(variant.variant);
    let variantCaseCount = 0;
    for (const group of variant.context_groups || []) {
      groupCount += 1;
      for (const field of ['initial_signal', 'required_evidence', 'primary_false_positive', 'safety_gate']) {
        if (!group[field]) fail.push(`procedural memory group missing ${field}: ${group.group_id || variant.variant}`);
      }
      signals.add(group.initial_signal);
      evidences.add(group.required_evidence);
      falsePositives.add(group.primary_false_positive);
      safetyGates.add(group.safety_gate);

      for (const item of group.cases || []) {
        caseCount += 1;
        variantCaseCount += 1;
        for (const field of ['id', 'title', 'surface', 'candidate_impact', 'source_file']) {
          if (!item[field]) fail.push(`procedural memory case missing ${field}: ${item.id || group.group_id}`);
        }
        if (ids.has(item.id)) fail.push('duplicate procedural memory case id: ' + item.id);
        ids.add(item.id);
        surfaces.add(item.surface);
        impacts.add(item.candidate_impact);
        if (item.source_file && exists(item.source_file) && !read(item.source_file).includes(item.id)) {
          fail.push(`procedural memory case ${item.id} missing from compact source file ${item.source_file}`);
        }
      }
    }
    if (variant.case_count !== variantCaseCount) {
      fail.push(`procedural memory variant case_count mismatch for ${variant.variant}`);
    }
  }

  const actual = {
    total_card_count: caseCount,
    variant_count: variants.size,
    surface_count: surfaces.size,
    candidate_impact_count: impacts.size,
    initial_signal_count: signals.size,
    required_evidence_count: evidences.size,
    primary_false_positive_count: falsePositives.size,
    safety_gate_count: safetyGates.size,
    context_group_count: groupCount
  };

  if (caseCount < preservation.original_card_count) {
    fail.push(`procedural memory has fewer total cases than preserved originals: ${caseCount}`);
  }
  if (preservation.total_card_count !== undefined && preservation.total_card_count !== caseCount) {
    fail.push(`procedural memory total_card_count mismatch: expected ${caseCount}, found ${preservation.total_card_count}`);
  }
  if (preservation.added_public_card_count !== undefined && preservation.added_public_card_count !== caseCount - preservation.original_card_count) {
    fail.push(`procedural memory added_public_card_count mismatch: expected ${caseCount - preservation.original_card_count}, found ${preservation.added_public_card_count}`);
  }

  for (const [key, value] of Object.entries(actual)) {
    if (preservation[key] !== undefined && preservation[key] !== value) {
      fail.push(`procedural memory preservation mismatch for ${key}: expected ${value}, found ${preservation[key]}`);
    }
  }

  for (const [key, value] of Object.entries(minimumExpected)) {
    if (key === 'original_card_count') continue;
    if (actual[key] < value) {
      fail.push(`procedural memory actual coverage below minimum for ${key}: expected at least ${value}, found ${actual[key]}`);
    }
  }
  for (const variant of requiredNewVariants) {
    if (!variants.has(variant)) fail.push('missing new procedural memory variant: ' + variant);
  }
}

const docs = ['README.md', 'NOTICE.md', 'SECURITY.md', ...walk('docs'), ...walk('examples')].filter((rel) => /\.(md|ya?ml)$/i.test(rel));
const markdown = docs.filter((rel) => /\.md$/i.test(rel));
const portuguese = /\b(nao|evidencia|missao|decisao|hipotese|validacao|saida|sinal|superficie|roteamento|mitigacoes|referencias|cartao|intencao|raciocinar|inventario|tecnica|tratamento|requisitos|reporte|separar|redigir|incluir|mitigacao|navegador|preferivel|alvo|cabecalho|requisicao|resposta|fila|prova|relatorio|escopo|autorizacao)\b/i;
for (const rel of docs) {
  const text = read(rel);
  if (portuguese.test(text)) fail.push('possible Portuguese residue in ' + rel);
  if (/[^\x00-\x7F]/.test(text)) fail.push('non-ASCII text in ' + rel);
}

for (const rel of markdown) {
  const text = read(rel);
  const h1Count = (text.match(/^# /gm) || []).length;
  if (h1Count !== 1) fail.push(`expected exactly one H1 in ${rel}, found ${h1Count}`);

  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(text))) {
    const href = match[1];
    if (/^(https?:|mailto:|#)/i.test(href)) continue;
    const target = href.split('#')[0];
    if (!target) continue;
    if (!fs.existsSync(resolveRel(rel, target))) fail.push(`broken local link in ${rel}: ${href}`);
  }
}

if (skill) {
  const requiredSignalClasses = [
    'te_0_dechunking_smuggling',
    'chunked_parser_differential',
    'chunk_extension_smuggling',
    'chunk_terminator_confusion',
    'trailer_newline_request_joining',
    'trace_assisted_desync',
    'vh_hv_parser_discrepancy',
    'h2c_cleartext_upgrade_smuggling',
    'http3_connection_contamination',
    'opportunistic_tls_upgrade_desync',
    'response_header_removal_bypass',
    'expect_complexity_bomb',
    'double_desync_gadget'
  ];
  for (const signalClass of requiredSignalClasses) {
    if (!skill.signal_classes?.includes(signalClass)) fail.push('missing new signal class: ' + signalClass);
  }

  const documented = new Set(Object.values(skill.documents || {}));
  const topLevelDocs = walk('docs')
    .filter((rel) => /\.md$/i.test(rel))
    .filter((rel) => rel === 'docs/procedural-memory/README.md' || !rel.startsWith('docs/procedural-memory/'));
  for (const rel of topLevelDocs) {
    if (!documented.has(rel)) fail.push('top-level doc not referenced by skill.json: ' + rel);
  }
}

const readme = read('README.md');
for (const phrase of ['Authorized testing only', 'not an exploit pack', 'manual approval']) {
  if (!readme.toLowerCase().includes(phrase.toLowerCase())) fail.push('README missing safety phrase: ' + phrase);
}

const examples = walk('examples').filter((rel) => /\.ya?ml$/i.test(rel));
if (examples.length < 5) fail.push('expected at least 5 YAML examples');

if (skill?.recommended_output) {
  const statuses = new Set(skill.recommended_output.status_values || []);
  const coveredStatuses = new Set();
  const requiredFields = skill.recommended_output.required_fields || [];

  for (const rel of examples) {
    const text = read(rel);
    const status = text.match(/^status:\s*(.+)$/m)?.[1]?.trim();
    if (!status) fail.push('example missing status: ' + rel);
    else if (!statuses.has(status)) fail.push(`example uses unknown status in ${rel}: ${status}`);
    else coveredStatuses.add(status);

    for (const field of requiredFields) {
      const pattern = new RegExp('^' + field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':', 'm');
      if (!pattern.test(text)) fail.push(`example missing required field ${field}: ${rel}`);
    }
  }

  for (const status of statuses) {
    if (!coveredStatuses.has(status)) fail.push('no YAML example covers status: ' + status);
  }
}

if (fail.length) {
  console.error('Validation failed:');
  for (const item of fail) console.error('- ' + item);
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  docs: docs.length,
  examples: examples.length,
  sources: Array.isArray(sources) ? sources.length : 0,
  procedural_memory_cases: proceduralMemory?.preservation?.total_card_count || proceduralMemory?.preservation?.original_card_count || 0,
  procedural_memory_context_groups: proceduralMemory?.preservation?.context_group_count || 0
}, null, 2));
