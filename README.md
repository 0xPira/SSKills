# Public Specialist Skills

Public, safety-first specialist skills for security agents and human reviewers.

This repository is a collection, not a single-vulnerability project. Each folder under
`skills/` is a standalone specialist skill with its own metadata, documentation, sources,
examples, and validation script.

## Current Skills

- [HTTP Request Smuggling / Desync Assessment](skills/request-smuggling/README.md)
  - Path: `skills/request-smuggling`
  - Focus: request smuggling, HTTP desync, parser discrepancies, protocol downgrade boundaries, queue poisoning, and manual proof contracts.
  - Safety posture: no automatic malformed framing, no victim traffic, no shared cache or queue poisoning without isolation.

## Repository Layout

```text
public-specialist-skills/
  README.md
  LICENSE
  SECURITY.md
  NOTICE.md
  skills.json
  package.json
  scripts/
    validate-all.js
  skills/
    request-smuggling/
      skill.json
      README.md
      docs/
      examples/
      sources.json
      scripts/validate.js
```

## Skill Contract

Each public skill should include:

- `skill.json`: machine-readable metadata, signal classes, safety posture, retrieval guidance, and document map.
- `README.md`: human-readable entrypoint.
- `docs/`: detailed reference material loaded as needed.
- `examples/`: safe output examples, not exploit payloads.
- `sources.json`: attribution and review sources.
- `scripts/validate.js`: deterministic local validation.

Skills should be safe by default. They should help classify, triage, reject weak findings,
and produce bounded proof contracts. They should not automate exploit payload generation or
perform active validation without explicit manual approval.

## Validation

Run all skill validators:

```bash
npm run validate
```

Run only the request smuggling skill validator:

```bash
npm run validate:request-smuggling
```

## Adding A Skill

1. Create `skills/<slug>/`.
2. Add `skill.json`, `README.md`, `docs/`, `examples/`, `sources.json`, and `scripts/validate.js`.
3. Add the skill to [skills.json](skills.json).
4. Add a package script if the skill has a dedicated validator.
5. Run `npm run validate`.

## License

MIT. See [LICENSE](LICENSE).
