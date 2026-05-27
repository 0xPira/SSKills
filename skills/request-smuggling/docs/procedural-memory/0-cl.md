# Procedural Memory: 0.CL

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### 0-cl-01

- Initial signal: method/body mismatch
- Required evidence: method-specific behavior is reproducible
- Primary false positive: application ignores body safely
- Safety gate: no body flood

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0121 | CDN edge | header disclosure |
| RS-MEM-0124 | API gateway | tenant boundary confusion |
| RS-MEM-0127 | Cloudflare/Pingora proxy | response queue poisoning |
| RS-MEM-0130 | Apache mod_proxy | inventory only |
| RS-MEM-0133 | Fastly shield | inventory only |
| RS-MEM-0136 | Go net/http origin | auth/session impact |
| RS-MEM-0139 | web VPN | inventory only |

### 0-cl-02

- Initial signal: GET/HEAD/OPTIONS body handling discrepancy
- Required evidence: front-end forwards body even when policy says no body
- Primary false positive: proxy blocks methods with body
- Safety gate: method allowlist respected

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0122 | WAF layer | response queue poisoning |
| RS-MEM-0125 | AWS ALB | request queue poisoning |
| RS-MEM-0128 | HAProxy frontend | auth/session impact |
| RS-MEM-0131 | NGINX upstream | tenant boundary confusion |
| RS-MEM-0134 | Kubernetes ingress | request queue poisoning |
| RS-MEM-0137 | Caddy reverse_proxy | inventory only |
| RS-MEM-0140 | browser connection pool | WAF bypass |

### 0-cl-03

- Initial signal: implicit-zero interpretation
- Required evidence: back-end waits or consumes body
- Primary false positive: normal 411/400 response
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0123 | reverse proxy | inventory only |
| RS-MEM-0126 | Akamai property | response queue poisoning |
| RS-MEM-0129 | Envoy/Istio gateway | cache poisoning |
| RS-MEM-0132 | Varnish cache | tenant boundary confusion |
| RS-MEM-0135 | Node.js origin | header disclosure |
| RS-MEM-0138 | IIS/Kestrel | header disclosure |
