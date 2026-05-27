# Procedural Memory: pause-based desync

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### pause-based-desync-01

- Initial signal: connection left open after timeout
- Required evidence: front-end streams partial request
- Primary false positive: front-end timeout first
- Safety gate: single route, low concurrency

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0341 | CDN edge | WAF bypass |
| RS-MEM-0344 | API gateway | header disclosure |
| RS-MEM-0347 | Cloudflare/Pingora proxy | tenant boundary confusion |
| RS-MEM-0350 | Apache mod_proxy | host routing confusion |
| RS-MEM-0353 | Fastly shield | host routing confusion |
| RS-MEM-0356 | Go net/http origin | cache poisoning |
| RS-MEM-0359 | web VPN | host routing confusion |

### pause-based-desync-02

- Initial signal: headers sent then delayed body
- Required evidence: back-end response before promised body
- Primary false positive: backend closes connection
- Safety gate: manual gate

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0342 | WAF layer | tenant boundary confusion |
| RS-MEM-0345 | AWS ALB | inventory only |
| RS-MEM-0348 | HAProxy frontend | cache poisoning |
| RS-MEM-0351 | NGINX upstream | header disclosure |
| RS-MEM-0354 | Kubernetes ingress | inventory only |
| RS-MEM-0357 | Caddy reverse_proxy | host routing confusion |
| RS-MEM-0360 | browser connection pool | front-end ACL bypass |

### pause-based-desync-03

- Initial signal: read timeout asymmetry
- Required evidence: late body affects later parsing
- Primary false positive: slowloris/DoS behavior
- Safety gate: strict timeout budget

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0343 | reverse proxy | host routing confusion |
| RS-MEM-0346 | Akamai property | tenant boundary confusion |
| RS-MEM-0349 | Envoy/Istio gateway | request queue poisoning |
| RS-MEM-0352 | Varnish cache | header disclosure |
| RS-MEM-0355 | Node.js origin | WAF bypass |
| RS-MEM-0358 | IIS/Kestrel | WAF bypass |
