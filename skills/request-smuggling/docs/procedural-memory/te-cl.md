# Procedural Memory: TE.CL

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### te-cl-01

- Initial signal: chunked body accepted at edge
- Required evidence: backend response timing differs from edge response
- Primary false positive: client-side pipelining artifact
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0021 | CDN edge | host routing confusion |
| RS-MEM-0024 | API gateway | inventory only |
| RS-MEM-0027 | Cloudflare/Pingora proxy | request queue poisoning |
| RS-MEM-0030 | Apache mod_proxy | front-end ACL bypass |
| RS-MEM-0033 | Fastly shield | front-end ACL bypass |
| RS-MEM-0036 | Go net/http origin | tenant boundary confusion |
| RS-MEM-0039 | web VPN | front-end ACL bypass |

### te-cl-02

- Initial signal: origin appears to consume fixed length
- Required evidence: connection close behavior is stable
- Primary false positive: proxy dechunks before origin
- Safety gate: strict request budget

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0022 | WAF layer | request queue poisoning |
| RS-MEM-0025 | AWS ALB | WAF bypass |
| RS-MEM-0028 | HAProxy frontend | tenant boundary confusion |
| RS-MEM-0031 | NGINX upstream | inventory only |
| RS-MEM-0034 | Kubernetes ingress | WAF bypass |
| RS-MEM-0037 | Caddy reverse_proxy | front-end ACL bypass |
| RS-MEM-0040 | browser connection pool | auth/session impact |

### te-cl-03

- Initial signal: unconsumed bytes can become next request prefix
- Required evidence: edge and origin disagree about final chunk
- Primary false positive: origin rejects chunked bodies
- Safety gate: dedicated test host when possible

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0023 | reverse proxy | front-end ACL bypass |
| RS-MEM-0026 | Akamai property | request queue poisoning |
| RS-MEM-0029 | Envoy/Istio gateway | header disclosure |
| RS-MEM-0032 | Varnish cache | inventory only |
| RS-MEM-0035 | Node.js origin | host routing confusion |
| RS-MEM-0038 | IIS/Kestrel | host routing confusion |
