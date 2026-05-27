# Procedural Memory: browser-powered server-side desync

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### browser-powered-server-side-desync-01

- Initial signal: browser can trigger prefix
- Required evidence: test account impact path exists
- Primary false positive: HTTP/2 prevents connection reuse
- Safety gate: manual gate

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0321 | CDN edge | header disclosure |
| RS-MEM-0324 | API gateway | tenant boundary confusion |
| RS-MEM-0327 | Cloudflare/Pingora proxy | response queue poisoning |
| RS-MEM-0330 | Apache mod_proxy | inventory only |
| RS-MEM-0333 | Fastly shield | inventory only |
| RS-MEM-0336 | Go net/http origin | auth/session impact |
| RS-MEM-0339 | web VPN | inventory only |

### browser-powered-server-side-desync-02

- Initial signal: front-end streams to origin
- Required evidence: no raw malformed request required
- Primary false positive: browser cannot send required headers
- Safety gate: no victim traffic

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0322 | WAF layer | response queue poisoning |
| RS-MEM-0325 | AWS ALB | request queue poisoning |
| RS-MEM-0328 | HAProxy frontend | auth/session impact |
| RS-MEM-0331 | NGINX upstream | tenant boundary confusion |
| RS-MEM-0334 | Kubernetes ingress | request queue poisoning |
| RS-MEM-0337 | Caddy reverse_proxy | inventory only |
| RS-MEM-0340 | browser connection pool | WAF bypass |

### browser-powered-server-side-desync-03

- Initial signal: origin leaves bytes queued
- Required evidence: same-origin or cross-origin browser constraints understood
- Primary false positive: CORS preflight changes method
- Safety gate: browser lab first

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0323 | reverse proxy | inventory only |
| RS-MEM-0326 | Akamai property | response queue poisoning |
| RS-MEM-0329 | Envoy/Istio gateway | cache poisoning |
| RS-MEM-0332 | Varnish cache | tenant boundary confusion |
| RS-MEM-0335 | Node.js origin | header disclosure |
| RS-MEM-0338 | IIS/Kestrel | header disclosure |
