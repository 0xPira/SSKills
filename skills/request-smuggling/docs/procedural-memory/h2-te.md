# Procedural Memory: H2.TE

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### h2-te-01

- Initial signal: edge fails to reject
- Required evidence: HTTP/2 endpoint accepts illegal TE
- Primary false positive: edge strips TE
- Safety gate: no broad TE mutation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0161 | CDN edge | host routing confusion |
| RS-MEM-0164 | API gateway | inventory only |
| RS-MEM-0167 | Cloudflare/Pingora proxy | request queue poisoning |
| RS-MEM-0170 | Apache mod_proxy | front-end ACL bypass |
| RS-MEM-0173 | Fastly shield | front-end ACL bypass |
| RS-MEM-0176 | Go net/http origin | tenant boundary confusion |
| RS-MEM-0179 | web VPN | front-end ACL bypass |

### h2-te-02

- Initial signal: TE header other than trailers
- Required evidence: origin receives chunked or TE-like header
- Primary false positive: endpoint only supports h2 end-to-end
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0162 | WAF layer | request queue poisoning |
| RS-MEM-0165 | AWS ALB | WAF bypass |
| RS-MEM-0168 | HAProxy frontend | tenant boundary confusion |
| RS-MEM-0171 | NGINX upstream | inventory only |
| RS-MEM-0174 | Kubernetes ingress | WAF bypass |
| RS-MEM-0177 | Caddy reverse_proxy | front-end ACL bypass |
| RS-MEM-0180 | browser connection pool | auth/session impact |

### h2-te-03

- Initial signal: downgrade creates Transfer-Encoding on HTTP/1
- Required evidence: normal HTTP/2 path differs from HTTP/1 path
- Primary false positive: client displayed request as HTTP/1 but sent HTTP/1
- Safety gate: record actual wire protocol

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0163 | reverse proxy | front-end ACL bypass |
| RS-MEM-0166 | Akamai property | request queue poisoning |
| RS-MEM-0169 | Envoy/Istio gateway | header disclosure |
| RS-MEM-0172 | Varnish cache | inventory only |
| RS-MEM-0175 | Node.js origin | host routing confusion |
| RS-MEM-0178 | IIS/Kestrel | host routing confusion |
