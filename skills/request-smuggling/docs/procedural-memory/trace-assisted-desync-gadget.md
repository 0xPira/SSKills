# Procedural Memory: TRACE-assisted desync gadget

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from [card-matrix.json](./card-matrix.json). It preserves each case ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate.

## Context Groups

### trace-assisted-desync-gadget-01

- Initial signal: TRACE enabled through a proxy chain
- Required evidence: root parser differential is named separately
- Primary false positive: TRACE is blocked or only reflects the visible request
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0397 | Fastly shield | host routing confusion |
| RS-MEM-0398 | Kubernetes ingress | cache poisoning |
| RS-MEM-0399 | Node.js origin | auth/session impact |

### trace-assisted-desync-gadget-02

- Initial signal: response concatenation or hidden second response is visible
- Required evidence: response header removal or concatenation explains what became visible
- Primary false positive: response concatenation is client-side pipelining output
- Safety gate: stop on sensitive reflected headers

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0400 | Go net/http origin | cache poisoning |
| RS-MEM-0401 | Caddy reverse_proxy | auth/session impact |
| RS-MEM-0402 | IIS/Kestrel | WAF bypass |
