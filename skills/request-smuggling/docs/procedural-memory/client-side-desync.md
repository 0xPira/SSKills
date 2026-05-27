# Procedural Memory: client-side desync

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### client-side-desync-01

- Initial signal: browser can issue cross-origin request
- Required evidence: impact gadget exists
- Primary false positive: CORS-only issue
- Safety gate: no real victim

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0301 | CDN edge | WAF bypass |
| RS-MEM-0313 | Fastly shield | host routing confusion |

### client-side-desync-02

- Initial signal: HTTP/1.1 connection reuse
- Required evidence: browser PoC possible only with approval
- Primary false positive: HTTP/2 used by browser
- Safety gate: test browser/profile only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0302 | WAF layer | tenant boundary confusion |
| RS-MEM-0314 | Kubernetes ingress | inventory only |

### client-side-desync-03

- Initial signal: target lacks HTTP/2 for victim path
- Required evidence: endpoint early-response behavior
- Primary false positive: server closes connection after early response
- Safety gate: manual gate

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0303 | reverse proxy | host routing confusion |
| RS-MEM-0315 | Node.js origin | WAF bypass |

### client-side-desync-04

- Initial signal: server responds before reading body
- Required evidence: impact gadget exists
- Primary false positive: CORS-only issue
- Safety gate: no real victim

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0304 | API gateway | header disclosure |
| RS-MEM-0316 | Go net/http origin | cache poisoning |

### client-side-desync-05

- Initial signal: browser can issue cross-origin request
- Required evidence: browser PoC possible only with approval
- Primary false positive: HTTP/2 used by browser
- Safety gate: test browser/profile only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0305 | AWS ALB | inventory only |
| RS-MEM-0317 | Caddy reverse_proxy | host routing confusion |

### client-side-desync-06

- Initial signal: HTTP/1.1 connection reuse
- Required evidence: endpoint early-response behavior
- Primary false positive: server closes connection after early response
- Safety gate: manual gate

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0306 | Akamai property | tenant boundary confusion |
| RS-MEM-0318 | IIS/Kestrel | WAF bypass |

### client-side-desync-07

- Initial signal: target lacks HTTP/2 for victim path
- Required evidence: impact gadget exists
- Primary false positive: CORS-only issue
- Safety gate: no real victim

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0307 | Cloudflare/Pingora proxy | tenant boundary confusion |
| RS-MEM-0319 | web VPN | host routing confusion |

### client-side-desync-08

- Initial signal: server responds before reading body
- Required evidence: browser PoC possible only with approval
- Primary false positive: HTTP/2 used by browser
- Safety gate: test browser/profile only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0308 | HAProxy frontend | cache poisoning |
| RS-MEM-0320 | browser connection pool | front-end ACL bypass |

### client-side-desync-09

- Initial signal: browser can issue cross-origin request
- Required evidence: endpoint early-response behavior
- Primary false positive: server closes connection after early response
- Safety gate: manual gate

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0309 | Envoy/Istio gateway | request queue poisoning |

### client-side-desync-10

- Initial signal: HTTP/1.1 connection reuse
- Required evidence: impact gadget exists
- Primary false positive: CORS-only issue
- Safety gate: no real victim

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0310 | Apache mod_proxy | host routing confusion |

### client-side-desync-11

- Initial signal: target lacks HTTP/2 for victim path
- Required evidence: browser PoC possible only with approval
- Primary false positive: HTTP/2 used by browser
- Safety gate: test browser/profile only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0311 | NGINX upstream | header disclosure |

### client-side-desync-12

- Initial signal: server responds before reading body
- Required evidence: endpoint early-response behavior
- Primary false positive: server closes connection after early response
- Safety gate: manual gate

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0312 | Varnish cache | header disclosure |
