# Procedural Memory: opportunistic TLS / RFC 2817 desync

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from [card-matrix.json](./card-matrix.json). It preserves each case ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate.

## Context Groups

### opportunistic-tls-rfc2817-desync-01

- Initial signal: RFC 2817 style Upgrade path
- Required evidence: one hop believes the connection changed protocol while another continues HTTP/1.1 parsing
- Primary false positive: TLS upgrade not enabled on the path
- Safety gate: lab or owned proxy first

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0403 | Node.js origin | response queue poisoning |
| RS-MEM-0404 | Go net/http origin | tenant boundary confusion |
| RS-MEM-0405 | Caddy reverse_proxy | inventory only |

### opportunistic-tls-rfc2817-desync-02

- Initial signal: reject or partial transition keeps the connection reusable
- Required evidence: close-on-reject behavior differs between hops
- Primary false positive: connection closes before any follow-up interpretation
- Safety gate: no third-party tunnel or victim traffic

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0406 | IIS/Kestrel | tenant boundary confusion |
| RS-MEM-0407 | web VPN | inventory only |
| RS-MEM-0408 | browser connection pool | request queue poisoning |
