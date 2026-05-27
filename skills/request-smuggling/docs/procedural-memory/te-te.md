# Procedural Memory: TE.TE

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### te-te-01

- Initial signal: case or whitespace tolerant parser
- Required evidence: front-end and back-end normalize TE differently
- Primary false positive: scanner-only label
- Safety gate: do not fuzz production broadly

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0041 | CDN edge | host routing confusion |
| RS-MEM-0044 | API gateway | inventory only |
| RS-MEM-0047 | Cloudflare/Pingora proxy | request queue poisoning |
| RS-MEM-0050 | Apache mod_proxy | front-end ACL bypass |
| RS-MEM-0053 | Fastly shield | front-end ACL bypass |
| RS-MEM-0056 | Go net/http origin | tenant boundary confusion |
| RS-MEM-0059 | web VPN | front-end ACL bypass |

### te-te-02

- Initial signal: non-canonical TE token
- Required evidence: single canonical TE is rejected or normalized
- Primary false positive: legacy proxy removes unknown transfer codings
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0042 | WAF layer | request queue poisoning |
| RS-MEM-0045 | AWS ALB | WAF bypass |
| RS-MEM-0048 | HAProxy frontend | tenant boundary confusion |
| RS-MEM-0051 | NGINX upstream | inventory only |
| RS-MEM-0054 | Kubernetes ingress | WAF bypass |
| RS-MEM-0057 | Caddy reverse_proxy | front-end ACL bypass |
| RS-MEM-0060 | browser connection pool | auth/session impact |

### te-te-03

- Initial signal: duplicate Transfer-Encoding fields
- Required evidence: differential survives non-reused client connection
- Primary false positive: generic invalid header rejection
- Safety gate: record exact normalization

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0043 | reverse proxy | front-end ACL bypass |
| RS-MEM-0046 | Akamai property | request queue poisoning |
| RS-MEM-0049 | Envoy/Istio gateway | header disclosure |
| RS-MEM-0052 | Varnish cache | inventory only |
| RS-MEM-0055 | Node.js origin | host routing confusion |
| RS-MEM-0058 | IIS/Kestrel | host routing confusion |
