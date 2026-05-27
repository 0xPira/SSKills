# Procedural Memory: connection-locked request smuggling

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### connection-locked-request-smuggling-01

- Initial signal: attack fails with client connection reuse disabled
- Required evidence: impact via cache, header leak or front-end control bypass
- Primary false positive: same-server direct path
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0261 | CDN edge | host routing confusion |
| RS-MEM-0264 | API gateway | inventory only |
| RS-MEM-0267 | Cloudflare/Pingora proxy | request queue poisoning |
| RS-MEM-0270 | Apache mod_proxy | front-end ACL bypass |
| RS-MEM-0273 | Fastly shield | front-end ACL bypass |
| RS-MEM-0276 | Go net/http origin | tenant boundary confusion |
| RS-MEM-0279 | web VPN | front-end ACL bypass |

### connection-locked-request-smuggling-02

- Initial signal: succeeds with same client connection
- Required evidence: not just surprising self-response
- Primary false positive: ordinary pipelining
- Safety gate: explicitly label connection-locked

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0262 | WAF layer | request queue poisoning |
| RS-MEM-0265 | AWS ALB | WAF bypass |
| RS-MEM-0268 | HAProxy frontend | tenant boundary confusion |
| RS-MEM-0271 | NGINX upstream | inventory only |
| RS-MEM-0274 | Kubernetes ingress | WAF bypass |
| RS-MEM-0277 | Caddy reverse_proxy | front-end ACL bypass |
| RS-MEM-0280 | browser connection pool | auth/session impact |

### connection-locked-request-smuggling-03

- Initial signal: HTTP/2 nested HTTP/1 response evidence
- Required evidence: nested response inside HTTP/2 response
- Primary false positive: tool requestsPerConnection artifact
- Safety gate: do not claim cross-user unless proven

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0263 | reverse proxy | front-end ACL bypass |
| RS-MEM-0266 | Akamai property | request queue poisoning |
| RS-MEM-0269 | Envoy/Istio gateway | header disclosure |
| RS-MEM-0272 | Varnish cache | inventory only |
| RS-MEM-0275 | Node.js origin | host routing confusion |
| RS-MEM-0278 | IIS/Kestrel | host routing confusion |
