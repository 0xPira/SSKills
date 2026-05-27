# HTTP Request Smuggling / Desync Assessment Skill

A public, safety-first playbook for triaging HTTP request smuggling, HTTP desync, parser discrepancy, and queue poisoning signals. It is designed for humans and agents that need to move from weak signals to evidence-rich hypotheses and manual-gated proof contracts.

This is not an exploit pack. It intentionally avoids automatic malformed framing, victim traffic, shared cache poisoning, and broad fuzzing.

## Who This Is For

- Bug bounty researchers working inside explicit scope.
- AppSec teams reviewing proxy/CDN/gateway/origin parser boundaries.
- Agent builders who need structured guidance for request smuggling triage.
- Reviewers who need to reject scanner-only or timing-only false positives.

## What It Does

- Classifies request smuggling and desync variants, including TE.0, chunked parser differentials, h2c upgrade gaps, TRACE-assisted gadgets, and HTTP/3 connection contamination.
- Separates architecture evidence from payload evidence.
- Names the suspected parser boundary.
- Lists false-positive controls before impact claims.
- Produces a bounded manual proof contract.
- Routes cache, host routing, authentication, XSS, and access-control impact to the right downstream review.

## What It Does Not Do

- It does not generate or execute smuggling payloads automatically.
- It does not validate against real users or third-party traffic.
- It does not treat scanner output as confirmation.
- It does not recommend cache or queue poisoning on shared production paths.

## Safety Rules

- Authorized testing only.
- Start with ordinary GET/HEAD baselines, architecture inventory, ALPN/protocol evidence, headers, cache metadata, hashes, and timing buckets.
- Require explicit manual approval before malformed HTTP framing, ambiguous Content-Length/Transfer-Encoding, pauses, connection reuse probes, queue poisoning, cache poisoning, callbacks, or sensitive data access.
- Store metadata, hashes, and shapes instead of private bodies, cookies, credentials, or victim data.
- Stop on out-of-scope infrastructure, unexpected private data, repeated 5xx, elevated latency, or missing cleanup/purge path.

## Repository Layout

- [skill.json](skill.json): machine-readable public skill metadata.
- [docs/mission-and-model.md](docs/mission-and-model.md): scope, mental model, and expected reasoning posture.
- [docs/foundation.md](docs/foundation.md): core mental model and minimum evidence.
- [docs/normative-rules.md](docs/normative-rules.md): protocol rules that drive the assessment.
- [docs/decision-trees.md](docs/decision-trees.md): triage branches for scanner output, HTTP/2 edges, cache impact, protocol transitions, and reportability.
- [docs/variants.md](docs/variants.md): variant taxonomy.
- [docs/vendors.md](docs/vendors.md): technology and vendor review matrix.
- [docs/evidence-and-proof-contracts.md](docs/evidence-and-proof-contracts.md): schemas and proof contracts.
- [docs/false-positives.md](docs/false-positives.md): controls for common misleading signals.
- [docs/impact-and-reportability.md](docs/impact-and-reportability.md): impact categories, evidence floors, and reporting posture.
- [docs/mitigations.md](docs/mitigations.md): defensive recommendations.
- [docs/safety.md](docs/safety.md): hard gates, automatic limits, manual-only actions, and stop conditions.
- [docs/tooling.md](docs/tooling.md): tool interpretation notes.
- [docs/safe-tooling.md](docs/safe-tooling.md): safe tool use boundaries.
- [docs/procedural-memory](docs/procedural-memory/README.md): deduplicated procedural memory split by variant.
- [docs/procedural-memory/card-matrix.json](docs/procedural-memory/card-matrix.json): canonical matrix preserving all 360 original RS-MEM contexts plus public additions for newly cataloged themes.
- [docs/references.md](docs/references.md): source index.
- [examples](examples): safe example outputs.
- [scripts/validate.js](scripts/validate.js): local publication checks.

## Agent Loading Guidance

Start with `README.md`, `docs/safety.md`, `docs/foundation.md`, and `docs/decision-trees.md`.
Load `docs/variants.md` only after a candidate variant exists, and load the matching file under
`docs/procedural-memory/` instead of loading all memory cards at once. Use `docs/vendors.md` only
when the technology stack is known or suspected. Use `docs/references.md` for attribution and
follow-up review, not as a substitute for the proof contract.

For complete procedural-memory coverage, use `docs/procedural-memory/card-matrix.json`. It preserves
every original RS-MEM variant/surface/impact/evidence/false-positive/safety context while grouping
repeated scaffolding. Public additions are tracked separately in the matrix preservation metadata.

## Recommended Output Shape

```yaml
status: needs_more_evidence | hypothesis_ready | manual_proof_contract_required | discarded_false_positive | needs_specialized_review
variant_hypothesis: CL.TE | TE.CL | TE.TE | TE.0 | chunked_parser_differential | CL.0 | 0.CL | H2.CL | H2.TE | H2.0 | h2c_upgrade | http3_connection_contamination | trace_assisted | protocol_transition | unknown
architecture_hypothesis: edge_to_origin_unknown
parser_boundary: content_length | transfer_encoding | chunked_parser | dechunking | h2_length | h3_connection_state | pseudo_header | hop_by_hop | timeout | upgrade | unknown
required_evidence:
  - normal baseline metadata
  - HTTP version and ALPN evidence
  - front-end/back-end hypothesis
false_positive_controls:
  - rule out scanner-only finding
  - rule out self-pipelining
safe_next_step: collect passive architecture evidence
manual_gate_required: true
```

## Quick Start

1. Read [docs/safety.md](docs/safety.md).
2. Identify the weakest missing evidence from [docs/foundation.md](docs/foundation.md).
3. Use [docs/decision-trees.md](docs/decision-trees.md) to choose the next triage branch.
4. Classify the suspected variant with [docs/variants.md](docs/variants.md).
5. Challenge benign explanations with [docs/false-positives.md](docs/false-positives.md).
6. Produce a manual proof contract using [docs/evidence-and-proof-contracts.md](docs/evidence-and-proof-contracts.md).

## Validation

Run:

```bash
node scripts/validate.js
```

The validator checks JSON, document references, local links, heading structure, procedural-memory
preservation, example coverage, residual Portuguese terms, duplicate source IDs, retrieval guidance,
and basic safety language.

## License

MIT. See the collection-level [LICENSE](../../LICENSE).
