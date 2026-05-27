# Procedural Memory: invalid Content-Length

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### invalid-content-length-01

- Initial signal: leading whitespace
- Required evidence: connection reuse after invalid CL
- Primary false positive: body too large protection
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0081 | CDN edge | front-end ACL bypass |
| RS-MEM-0096 | Go net/http origin | request queue poisoning |

### invalid-content-length-02

- Initial signal: non-digit suffix
- Required evidence: origin parser family known to be lenient
- Primary false positive: normal timeout
- Safety gate: small benign bodies

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0082 | WAF layer | header disclosure |
| RS-MEM-0097 | Caddy reverse_proxy | auth/session impact |

### invalid-content-length-03

- Initial signal: very large value
- Required evidence: close/reject policy differs
- Primary false positive: rate limiter response
- Safety gate: abort on timeout accumulation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0083 | reverse proxy | auth/session impact |
| RS-MEM-0098 | IIS/Kestrel | front-end ACL bypass |

### invalid-content-length-04

- Initial signal: integer wrap risk
- Required evidence: connection reuse after invalid CL
- Primary false positive: body too large protection
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0084 | API gateway | WAF bypass |
| RS-MEM-0099 | web VPN | auth/session impact |

### invalid-content-length-05

- Initial signal: blank CL
- Required evidence: origin parser family known to be lenient
- Primary false positive: normal timeout
- Safety gate: small benign bodies

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0085 | AWS ALB | host routing confusion |
| RS-MEM-0100 | browser connection pool | response queue poisoning |

### invalid-content-length-06

- Initial signal: leading whitespace
- Required evidence: close/reject policy differs
- Primary false positive: rate limiter response
- Safety gate: abort on timeout accumulation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0086 | Akamai property | header disclosure |

### invalid-content-length-07

- Initial signal: non-digit suffix
- Required evidence: connection reuse after invalid CL
- Primary false positive: body too large protection
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0087 | Cloudflare/Pingora proxy | header disclosure |

### invalid-content-length-08

- Initial signal: very large value
- Required evidence: origin parser family known to be lenient
- Primary false positive: normal timeout
- Safety gate: small benign bodies

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0088 | HAProxy frontend | request queue poisoning |

### invalid-content-length-09

- Initial signal: integer wrap risk
- Required evidence: close/reject policy differs
- Primary false positive: rate limiter response
- Safety gate: abort on timeout accumulation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0089 | Envoy/Istio gateway | inventory only |

### invalid-content-length-10

- Initial signal: blank CL
- Required evidence: connection reuse after invalid CL
- Primary false positive: body too large protection
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0090 | Apache mod_proxy | auth/session impact |

### invalid-content-length-11

- Initial signal: leading whitespace
- Required evidence: origin parser family known to be lenient
- Primary false positive: normal timeout
- Safety gate: small benign bodies

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0091 | NGINX upstream | WAF bypass |

### invalid-content-length-12

- Initial signal: non-digit suffix
- Required evidence: close/reject policy differs
- Primary false positive: rate limiter response
- Safety gate: abort on timeout accumulation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0092 | Varnish cache | WAF bypass |

### invalid-content-length-13

- Initial signal: very large value
- Required evidence: connection reuse after invalid CL
- Primary false positive: body too large protection
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0093 | Fastly shield | auth/session impact |

### invalid-content-length-14

- Initial signal: integer wrap risk
- Required evidence: origin parser family known to be lenient
- Primary false positive: normal timeout
- Safety gate: small benign bodies

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0094 | Kubernetes ingress | host routing confusion |

### invalid-content-length-15

- Initial signal: blank CL
- Required evidence: close/reject policy differs
- Primary false positive: rate limiter response
- Safety gate: abort on timeout accumulation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0095 | Node.js origin | front-end ACL bypass |
