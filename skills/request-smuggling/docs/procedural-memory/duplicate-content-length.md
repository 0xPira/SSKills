# Procedural Memory: duplicate Content-Length

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### duplicate-content-length-01

- Initial signal: comma-joined CL values
- Required evidence: vendor/advisory maps to parser behavior
- Primary false positive: client library canonicalized before sending
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0061 | CDN edge | header disclosure |
| RS-MEM-0073 | Fastly shield | inventory only |

### duplicate-content-length-02

- Initial signal: empty or signed CL
- Required evidence: one hop rejects while another forwards
- Primary false positive: proxy rejects before origin
- Safety gate: no automated permutation spray

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0062 | WAF layer | response queue poisoning |
| RS-MEM-0074 | Kubernetes ingress | request queue poisoning |

### duplicate-content-length-03

- Initial signal: overflow or leading plus/minus
- Required evidence: logs show duplicate handling
- Primary false positive: A/B backend pool variation
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0063 | reverse proxy | inventory only |
| RS-MEM-0075 | Node.js origin | header disclosure |

### duplicate-content-length-04

- Initial signal: duplicate CL fields
- Required evidence: vendor/advisory maps to parser behavior
- Primary false positive: client library canonicalized before sending
- Safety gate: no automated permutation spray

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0064 | API gateway | tenant boundary confusion |
| RS-MEM-0076 | Go net/http origin | auth/session impact |

### duplicate-content-length-05

- Initial signal: comma-joined CL values
- Required evidence: one hop rejects while another forwards
- Primary false positive: proxy rejects before origin
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0065 | AWS ALB | request queue poisoning |
| RS-MEM-0077 | Caddy reverse_proxy | inventory only |

### duplicate-content-length-06

- Initial signal: empty or signed CL
- Required evidence: logs show duplicate handling
- Primary false positive: A/B backend pool variation
- Safety gate: no automated permutation spray

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0066 | Akamai property | response queue poisoning |
| RS-MEM-0078 | IIS/Kestrel | header disclosure |

### duplicate-content-length-07

- Initial signal: overflow or leading plus/minus
- Required evidence: vendor/advisory maps to parser behavior
- Primary false positive: client library canonicalized before sending
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0067 | Cloudflare/Pingora proxy | response queue poisoning |
| RS-MEM-0079 | web VPN | inventory only |

### duplicate-content-length-08

- Initial signal: duplicate CL fields
- Required evidence: one hop rejects while another forwards
- Primary false positive: proxy rejects before origin
- Safety gate: no automated permutation spray

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0068 | HAProxy frontend | auth/session impact |
| RS-MEM-0080 | browser connection pool | WAF bypass |

### duplicate-content-length-09

- Initial signal: comma-joined CL values
- Required evidence: logs show duplicate handling
- Primary false positive: A/B backend pool variation
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0069 | Envoy/Istio gateway | cache poisoning |

### duplicate-content-length-10

- Initial signal: empty or signed CL
- Required evidence: vendor/advisory maps to parser behavior
- Primary false positive: client library canonicalized before sending
- Safety gate: no automated permutation spray

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0070 | Apache mod_proxy | inventory only |

### duplicate-content-length-11

- Initial signal: overflow or leading plus/minus
- Required evidence: one hop rejects while another forwards
- Primary false positive: proxy rejects before origin
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0071 | NGINX upstream | tenant boundary confusion |

### duplicate-content-length-12

- Initial signal: duplicate CL fields
- Required evidence: logs show duplicate handling
- Primary false positive: A/B backend pool variation
- Safety gate: no automated permutation spray

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0072 | Varnish cache | tenant boundary confusion |
