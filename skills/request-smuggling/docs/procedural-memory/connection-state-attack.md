# Procedural Memory: connection state attack

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### connection-state-attack-01

- Initial signal: Host filter bypass
- Required evidence: state mutation on same connection
- Primary false positive: normal keep-alive behavior
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0281 | CDN edge | cache poisoning |
| RS-MEM-0293 | Fastly shield | tenant boundary confusion |

### connection-state-attack-02

- Initial signal: prior request affects later request
- Required evidence: control request then probe request sequence
- Primary false positive: tool grouping artifact
- Safety gate: route to host-header/auth when primary issue is not smuggling

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0282 | WAF layer | host routing confusion |
| RS-MEM-0294 | Kubernetes ingress | response queue poisoning |

### connection-state-attack-03

- Initial signal: connection-bound auth
- Required evidence: impact without parser boundary confusion
- Primary false positive: session cookie state
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0283 | reverse proxy | tenant boundary confusion |
| RS-MEM-0295 | Node.js origin | cache poisoning |

### connection-state-attack-04

- Initial signal: stateful routing
- Required evidence: state mutation on same connection
- Primary false positive: normal keep-alive behavior
- Safety gate: route to host-header/auth when primary issue is not smuggling

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0284 | API gateway | auth/session impact |
| RS-MEM-0296 | Go net/http origin | WAF bypass |

### connection-state-attack-05

- Initial signal: Host filter bypass
- Required evidence: control request then probe request sequence
- Primary false positive: tool grouping artifact
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0285 | AWS ALB | response queue poisoning |
| RS-MEM-0297 | Caddy reverse_proxy | tenant boundary confusion |

### connection-state-attack-06

- Initial signal: prior request affects later request
- Required evidence: impact without parser boundary confusion
- Primary false positive: session cookie state
- Safety gate: route to host-header/auth when primary issue is not smuggling

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0286 | Akamai property | host routing confusion |
| RS-MEM-0298 | IIS/Kestrel | cache poisoning |

### connection-state-attack-07

- Initial signal: connection-bound auth
- Required evidence: state mutation on same connection
- Primary false positive: normal keep-alive behavior
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0287 | Cloudflare/Pingora proxy | host routing confusion |
| RS-MEM-0299 | web VPN | tenant boundary confusion |

### connection-state-attack-08

- Initial signal: stateful routing
- Required evidence: control request then probe request sequence
- Primary false positive: tool grouping artifact
- Safety gate: route to host-header/auth when primary issue is not smuggling

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0288 | HAProxy frontend | WAF bypass |
| RS-MEM-0300 | browser connection pool | request queue poisoning |

### connection-state-attack-09

- Initial signal: Host filter bypass
- Required evidence: impact without parser boundary confusion
- Primary false positive: session cookie state
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0289 | Envoy/Istio gateway | front-end ACL bypass |

### connection-state-attack-10

- Initial signal: prior request affects later request
- Required evidence: state mutation on same connection
- Primary false positive: normal keep-alive behavior
- Safety gate: route to host-header/auth when primary issue is not smuggling

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0290 | Apache mod_proxy | tenant boundary confusion |

### connection-state-attack-11

- Initial signal: connection-bound auth
- Required evidence: control request then probe request sequence
- Primary false positive: tool grouping artifact
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0291 | NGINX upstream | auth/session impact |

### connection-state-attack-12

- Initial signal: stateful routing
- Required evidence: impact without parser boundary confusion
- Primary false positive: session cookie state
- Safety gate: route to host-header/auth when primary issue is not smuggling

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0292 | Varnish cache | auth/session impact |
