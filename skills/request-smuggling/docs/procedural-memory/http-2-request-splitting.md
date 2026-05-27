# Procedural Memory: HTTP/2 request splitting

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### http-2-request-splitting-01

- Initial signal: ambiguous :path
- Required evidence: proxy rewrites are observable through reflection/header leak
- Primary false positive: application reflection not proxy splitting
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0201 | CDN edge | header disclosure |
| RS-MEM-0213 | Fastly shield | inventory only |

### http-2-request-splitting-02

- Initial signal: ambiguous :authority
- Required evidence: vendor history supports vector
- Primary false positive: frontend rejects malformed pseudo-headers
- Safety gate: no full smuggled request automation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0202 | WAF layer | response queue poisoning |
| RS-MEM-0214 | Kubernetes ingress | request queue poisoning |

### http-2-request-splitting-03

- Initial signal: method injection
- Required evidence: downstream request line or headers differ from HTTP/2 semantics
- Primary false positive: display-only newline escaping
- Safety gate: route to host-header/cache/XSS if impact shifts

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0203 | reverse proxy | inventory only |
| RS-MEM-0215 | Node.js origin | header disclosure |

### http-2-request-splitting-04

- Initial signal: CRLF in translated field
- Required evidence: proxy rewrites are observable through reflection/header leak
- Primary false positive: application reflection not proxy splitting
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0204 | API gateway | tenant boundary confusion |
| RS-MEM-0216 | Go net/http origin | auth/session impact |

### http-2-request-splitting-05

- Initial signal: ambiguous :path
- Required evidence: vendor history supports vector
- Primary false positive: frontend rejects malformed pseudo-headers
- Safety gate: no full smuggled request automation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0205 | AWS ALB | request queue poisoning |
| RS-MEM-0217 | Caddy reverse_proxy | inventory only |

### http-2-request-splitting-06

- Initial signal: ambiguous :authority
- Required evidence: downstream request line or headers differ from HTTP/2 semantics
- Primary false positive: display-only newline escaping
- Safety gate: route to host-header/cache/XSS if impact shifts

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0206 | Akamai property | response queue poisoning |
| RS-MEM-0218 | IIS/Kestrel | header disclosure |

### http-2-request-splitting-07

- Initial signal: method injection
- Required evidence: proxy rewrites are observable through reflection/header leak
- Primary false positive: application reflection not proxy splitting
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0207 | Cloudflare/Pingora proxy | response queue poisoning |
| RS-MEM-0219 | web VPN | inventory only |

### http-2-request-splitting-08

- Initial signal: CRLF in translated field
- Required evidence: vendor history supports vector
- Primary false positive: frontend rejects malformed pseudo-headers
- Safety gate: no full smuggled request automation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0208 | HAProxy frontend | auth/session impact |
| RS-MEM-0220 | browser connection pool | WAF bypass |

### http-2-request-splitting-09

- Initial signal: ambiguous :path
- Required evidence: downstream request line or headers differ from HTTP/2 semantics
- Primary false positive: display-only newline escaping
- Safety gate: route to host-header/cache/XSS if impact shifts

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0209 | Envoy/Istio gateway | cache poisoning |

### http-2-request-splitting-10

- Initial signal: ambiguous :authority
- Required evidence: proxy rewrites are observable through reflection/header leak
- Primary false positive: application reflection not proxy splitting
- Safety gate: manual only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0210 | Apache mod_proxy | inventory only |

### http-2-request-splitting-11

- Initial signal: method injection
- Required evidence: vendor history supports vector
- Primary false positive: frontend rejects malformed pseudo-headers
- Safety gate: no full smuggled request automation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0211 | NGINX upstream | tenant boundary confusion |

### http-2-request-splitting-12

- Initial signal: CRLF in translated field
- Required evidence: downstream request line or headers differ from HTTP/2 semantics
- Primary false positive: display-only newline escaping
- Safety gate: route to host-header/cache/XSS if impact shifts

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0212 | Varnish cache | tenant boundary confusion |
