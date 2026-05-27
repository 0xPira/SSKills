# Procedural Memory: CL.0

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### cl-0-01

- Initial signal: connection kept alive after early response
- Required evidence: body suffix affects next request only after server response
- Primary false positive: server closes connection after response
- Safety gate: prove impact beyond self-observation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0101 | CDN edge | header disclosure |
| RS-MEM-0104 | API gateway | tenant boundary confusion |
| RS-MEM-0107 | Cloudflare/Pingora proxy | response queue poisoning |
| RS-MEM-0110 | Apache mod_proxy | inventory only |
| RS-MEM-0113 | Fastly shield | inventory only |
| RS-MEM-0116 | Go net/http origin | auth/session impact |
| RS-MEM-0119 | web VPN | inventory only |

### cl-0-02

- Initial signal: endpoint ignores request body
- Required evidence: endpoint-specific behavior
- Primary false positive: only self-visible surprising response
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0102 | WAF layer | response queue poisoning |
| RS-MEM-0105 | AWS ALB | request queue poisoning |
| RS-MEM-0108 | HAProxy frontend | auth/session impact |
| RS-MEM-0111 | NGINX upstream | tenant boundary confusion |
| RS-MEM-0114 | Kubernetes ingress | request queue poisoning |
| RS-MEM-0117 | Caddy reverse_proxy | inventory only |
| RS-MEM-0120 | browser connection pool | WAF bypass |

### cl-0-03

- Initial signal: status generated before body read
- Required evidence: HTTP/1.1 reuse prerequisite
- Primary false positive: browser/client pipelining illusion
- Safety gate: isolate connection

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0103 | reverse proxy | inventory only |
| RS-MEM-0106 | Akamai property | response queue poisoning |
| RS-MEM-0109 | Envoy/Istio gateway | cache poisoning |
| RS-MEM-0112 | Varnish cache | tenant boundary confusion |
| RS-MEM-0115 | Node.js origin | header disclosure |
| RS-MEM-0118 | IIS/Kestrel | header disclosure |
