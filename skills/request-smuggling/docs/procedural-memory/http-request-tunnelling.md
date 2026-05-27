# Procedural Memory: HTTP request tunnelling

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### http-request-tunnelling-01

- Initial signal: front-end security bypass
- Required evidence: second response can reveal internal headers or bypass front-end path policy
- Primary false positive: testing client reused connection
- Safety gate: prove impact not just anomaly

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0221 | CDN edge | cache poisoning |
| RS-MEM-0224 | API gateway | auth/session impact |
| RS-MEM-0227 | Cloudflare/Pingora proxy | host routing confusion |
| RS-MEM-0230 | Apache mod_proxy | tenant boundary confusion |
| RS-MEM-0233 | Fastly shield | tenant boundary confusion |
| RS-MEM-0236 | Go net/http origin | WAF bypass |
| RS-MEM-0239 | web VPN | tenant boundary confusion |

### http-request-tunnelling-02

- Initial signal: two responses behind one front-end request
- Required evidence: works without victim traffic
- Primary false positive: debug server sends extra response
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0222 | WAF layer | host routing confusion |
| RS-MEM-0225 | AWS ALB | response queue poisoning |
| RS-MEM-0228 | HAProxy frontend | WAF bypass |
| RS-MEM-0231 | NGINX upstream | auth/session impact |
| RS-MEM-0234 | Kubernetes ingress | response queue poisoning |
| RS-MEM-0237 | Caddy reverse_proxy | tenant boundary confusion |
| RS-MEM-0240 | browser connection pool | request queue poisoning |

### http-request-tunnelling-03

- Initial signal: HEAD/non-blind oracle
- Required evidence: connection reuse policy explained
- Primary false positive: HTTP/1 pipelining false positive
- Safety gate: disable connection reuse first

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0223 | reverse proxy | tenant boundary confusion |
| RS-MEM-0226 | Akamai property | host routing confusion |
| RS-MEM-0229 | Envoy/Istio gateway | front-end ACL bypass |
| RS-MEM-0232 | Varnish cache | auth/session impact |
| RS-MEM-0235 | Node.js origin | cache poisoning |
| RS-MEM-0238 | IIS/Kestrel | cache poisoning |
