# Procedural Memory: H2.CL

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### h2-cl-01

- Initial signal: HTTP/2 edge
- Required evidence: edge calculates body length differently
- Primary false positive: origin not reachable through downgrade
- Safety gate: manual HTTP/2 tooling only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0141 | CDN edge | host routing confusion |
| RS-MEM-0144 | API gateway | inventory only |
| RS-MEM-0147 | Cloudflare/Pingora proxy | request queue poisoning |
| RS-MEM-0150 | Apache mod_proxy | front-end ACL bypass |
| RS-MEM-0153 | Fastly shield | front-end ACL bypass |
| RS-MEM-0156 | Go net/http origin | tenant boundary confusion |
| RS-MEM-0159 | web VPN | front-end ACL bypass |

### h2-cl-02

- Initial signal: HTTP/1 origin
- Required evidence: Burp/h2 capable client evidence
- Primary false positive: HTTP/2 used end-to-end
- Safety gate: no browser victim

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0142 | WAF layer | request queue poisoning |
| RS-MEM-0145 | AWS ALB | WAF bypass |
| RS-MEM-0148 | HAProxy frontend | tenant boundary confusion |
| RS-MEM-0151 | NGINX upstream | inventory only |
| RS-MEM-0154 | Kubernetes ingress | WAF bypass |
| RS-MEM-0157 | Caddy reverse_proxy | front-end ACL bypass |
| RS-MEM-0160 | browser connection pool | auth/session impact |

### h2-cl-03

- Initial signal: Content-Length retained after downgrade
- Required evidence: downgraded request preserves attacker-controlled CL
- Primary false positive: edge validates CL against DATA frames
- Safety gate: route through approved test account

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0143 | reverse proxy | front-end ACL bypass |
| RS-MEM-0146 | Akamai property | request queue poisoning |
| RS-MEM-0149 | Envoy/Istio gateway | header disclosure |
| RS-MEM-0152 | Varnish cache | inventory only |
| RS-MEM-0155 | Node.js origin | host routing confusion |
| RS-MEM-0158 | IIS/Kestrel | host routing confusion |
