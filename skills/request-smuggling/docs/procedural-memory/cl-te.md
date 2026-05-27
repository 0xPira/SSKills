# Procedural Memory: CL.TE

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from the original RS-MEM cards. It preserves every original card ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate. The canonical machine-readable matrix is [card-matrix.json](./card-matrix.json).


## Context Groups

### cl-te-01

- Initial signal: front-end forwards ambiguous body
- Required evidence: same request over isolated connection still yields parser disagreement
- Primary false positive: ordinary TE rejection
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0001 | CDN edge | host routing confusion |
| RS-MEM-0013 | Fastly shield | front-end ACL bypass |

### cl-te-02

- Initial signal: back-end decodes chunked framing
- Required evidence: 400/408/502 patterns differ by path
- Primary false positive: body buffering timeout
- Safety gate: no victim traffic

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0002 | WAF layer | request queue poisoning |
| RS-MEM-0014 | Kubernetes ingress | WAF bypass |

### cl-te-03

- Initial signal: conflicting length metadata
- Required evidence: front-end strips or preserves TE
- Primary false positive: WAF block before origin
- Safety gate: one in-scope route

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0003 | reverse proxy | front-end ACL bypass |
| RS-MEM-0015 | Node.js origin | host routing confusion |

### cl-te-04

- Initial signal: front-end forwards ambiguous body
- Required evidence: same request over isolated connection still yields parser disagreement
- Primary false positive: ordinary TE rejection
- Safety gate: abort on elevated 5xx rate

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0004 | API gateway | inventory only |
| RS-MEM-0016 | Go net/http origin | tenant boundary confusion |

### cl-te-05

- Initial signal: back-end decodes chunked framing
- Required evidence: 400/408/502 patterns differ by path
- Primary false positive: body buffering timeout
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0005 | AWS ALB | WAF bypass |
| RS-MEM-0017 | Caddy reverse_proxy | front-end ACL bypass |

### cl-te-06

- Initial signal: conflicting length metadata
- Required evidence: front-end strips or preserves TE
- Primary false positive: WAF block before origin
- Safety gate: no victim traffic

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0006 | Akamai property | request queue poisoning |
| RS-MEM-0018 | IIS/Kestrel | host routing confusion |

### cl-te-07

- Initial signal: front-end forwards ambiguous body
- Required evidence: same request over isolated connection still yields parser disagreement
- Primary false positive: ordinary TE rejection
- Safety gate: one in-scope route

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0007 | Cloudflare/Pingora proxy | request queue poisoning |
| RS-MEM-0019 | web VPN | front-end ACL bypass |

### cl-te-08

- Initial signal: back-end decodes chunked framing
- Required evidence: 400/408/502 patterns differ by path
- Primary false positive: body buffering timeout
- Safety gate: abort on elevated 5xx rate

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0008 | HAProxy frontend | tenant boundary confusion |
| RS-MEM-0020 | browser connection pool | auth/session impact |

### cl-te-09

- Initial signal: conflicting length metadata
- Required evidence: front-end strips or preserves TE
- Primary false positive: WAF block before origin
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0009 | Envoy/Istio gateway | header disclosure |

### cl-te-10

- Initial signal: front-end forwards ambiguous body
- Required evidence: same request over isolated connection still yields parser disagreement
- Primary false positive: ordinary TE rejection
- Safety gate: no victim traffic

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0010 | Apache mod_proxy | front-end ACL bypass |

### cl-te-11

- Initial signal: back-end decodes chunked framing
- Required evidence: 400/408/502 patterns differ by path
- Primary false positive: body buffering timeout
- Safety gate: one in-scope route

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0011 | NGINX upstream | inventory only |

### cl-te-12

- Initial signal: conflicting length metadata
- Required evidence: front-end strips or preserves TE
- Primary false positive: WAF block before origin
- Safety gate: abort on elevated 5xx rate

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0012 | Varnish cache | inventory only |
