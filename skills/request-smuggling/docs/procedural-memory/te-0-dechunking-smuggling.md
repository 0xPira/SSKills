# Procedural Memory: TE.0 / dechunking smuggling

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from [card-matrix.json](./card-matrix.json). It preserves each case ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate.

## Context Groups

### te-0-dechunking-smuggling-01

- Initial signal: edge or proxy dechunking policy
- Required evidence: hop-specific metadata shows dechunking before forwarding
- Primary false positive: ordinary TE rejection at the first hop
- Safety gate: manual malformed framing only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0361 | CDN edge | inventory only |
| RS-MEM-0362 | WAF layer | request queue poisoning |
| RS-MEM-0363 | reverse proxy | header disclosure |

### te-0-dechunking-smuggling-02

- Initial signal: Transfer-Encoding removed before origin
- Required evidence: origin behavior differs from a canonical chunked control
- Primary false positive: proxy buffers and rewrites a clean Content-Length
- Safety gate: no broad TE mutation

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0364 | AWS ALB | response queue poisoning |
| RS-MEM-0365 | Akamai property | tenant boundary confusion |
| RS-MEM-0366 | Cloudflare/Pingora proxy | inventory only |

### te-0-dechunking-smuggling-03

- Initial signal: downstream zero-length or implicit-body behavior
- Required evidence: connection close or reuse explains where leftover bytes can exist
- Primary false positive: origin never receives the request body
- Safety gate: isolate route and connection

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0367 | Envoy/Istio gateway | auth/session impact |
| RS-MEM-0368 | Apache mod_proxy | WAF bypass |
