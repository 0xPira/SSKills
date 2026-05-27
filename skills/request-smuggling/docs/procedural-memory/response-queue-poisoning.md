# Procedural Memory: response queue poisoning

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### response-queue-poisoning-01

- Initial signal: unexpected response body for baseline request
- Required evidence: response hash mismatch not explained by cache
- Primary false positive: cache variant
- Safety gate: owned test accounts

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0241 | CDN edge | header disclosure |
| RS-MEM-0244 | API gateway | tenant boundary confusion |
| RS-MEM-0247 | Cloudflare/Pingora proxy | response queue poisoning |
| RS-MEM-0250 | Apache mod_proxy | inventory only |
| RS-MEM-0253 | Fastly shield | inventory only |
| RS-MEM-0256 | Go net/http origin | auth/session impact |
| RS-MEM-0259 | web VPN | inventory only |

### response-queue-poisoning-02

- Initial signal: cross-user or self-controlled response queue
- Required evidence: queue shift persists for following request
- Primary false positive: load-balanced backend change
- Safety gate: no third-party data

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0242 | WAF layer | response queue poisoning |
| RS-MEM-0245 | AWS ALB | request queue poisoning |
| RS-MEM-0248 | HAProxy frontend | auth/session impact |
| RS-MEM-0251 | NGINX upstream | tenant boundary confusion |
| RS-MEM-0254 | Kubernetes ingress | request queue poisoning |
| RS-MEM-0257 | Caddy reverse_proxy | inventory only |
| RS-MEM-0260 | browser connection pool | WAF bypass |

### response-queue-poisoning-03

- Initial signal: shifted response order
- Required evidence: victim-free proof with paired test accounts
- Primary false positive: client pipelining artifact
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0243 | reverse proxy | inventory only |
| RS-MEM-0246 | Akamai property | response queue poisoning |
| RS-MEM-0249 | Envoy/Istio gateway | cache poisoning |
| RS-MEM-0252 | Varnish cache | tenant boundary confusion |
| RS-MEM-0255 | Node.js origin | header disclosure |
| RS-MEM-0258 | IIS/Kestrel | header disclosure |
