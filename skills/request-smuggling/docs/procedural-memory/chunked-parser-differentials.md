# Procedural Memory: chunked parser differentials

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from [card-matrix.json](./card-matrix.json). It preserves each case ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate.

## Context Groups

### chunked-parser-differentials-01

- Initial signal: chunk extension accepted by one hop and rejected by another
- Required evidence: front-end and origin disagree on where chunked body parsing ends
- Primary false positive: generic invalid chunk rejection
- Safety gate: manual research-only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0369 | WAF layer | WAF bypass |
| RS-MEM-0370 | reverse proxy | response queue poisoning |
| RS-MEM-0371 | API gateway | tenant boundary confusion |

### chunked-parser-differentials-02

- Initial signal: TERM.EXT or EXT.TERM style terminator order discrepancy
- Required evidence: benign canonical chunked controls behave normally
- Primary false positive: client library normalized chunk syntax before sending
- Safety gate: one route and one connection family at a time

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0372 | Akamai property | cache poisoning |
| RS-MEM-0373 | Cloudflare/Pingora proxy | auth/session impact |
| RS-MEM-0374 | HAProxy frontend | WAF bypass |

### chunked-parser-differentials-03

- Initial signal: TERM.SPILL or SPILL.TERM style spillover
- Required evidence: differential is mapped to a named parser family or observed hop
- Primary false positive: body buffering removes all chunk syntax before origin
- Safety gate: abort on repeated parse errors or 5xx

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0375 | Apache mod_proxy | front-end ACL bypass |
| RS-MEM-0376 | NGINX upstream | host routing confusion |
| RS-MEM-0377 | Varnish cache | cache poisoning |

### chunked-parser-differentials-04

- Initial signal: trailer-section newline or two-byte terminator confusion
- Required evidence: trailer or terminator boundary changes the following request shape
- Primary false positive: trailers ignored consistently at every hop
- Safety gate: metadata proof before impact proof

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0378 | Kubernetes ingress | request queue poisoning |
| RS-MEM-0379 | Node.js origin | header disclosure |
| RS-MEM-0380 | Go net/http origin | front-end ACL bypass |
