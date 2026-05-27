# Procedural Memory: HTTP/3 connection contamination

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from [card-matrix.json](./card-matrix.json). It preserves each case ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate.

## Context Groups

### http3-connection-contamination-01

- Initial signal: HTTP/3 edge with connection coalescing
- Required evidence: same connection routes authorities differently than fresh connections
- Primary false positive: client silently fell back to HTTP/2 or HTTP/1.1
- Safety gate: passive and owned-domain inventory first

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0389 | API gateway | request queue poisoning |
| RS-MEM-0390 | AWS ALB | header disclosure |
| RS-MEM-0391 | Akamai property | front-end ACL bypass |

### http3-connection-contamination-02

- Initial signal: sibling domains share a certificate or edge connection
- Required evidence: authority or routing state survives across independent H3 streams
- Primary false positive: normal wildcard certificate coalescing without backend confusion
- Safety gate: no sibling-domain testing outside scope

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0392 | HAProxy frontend | tenant boundary confusion |
| RS-MEM-0393 | Envoy/Istio gateway | inventory only |
| RS-MEM-0394 | Apache mod_proxy | request queue poisoning |

### http3-connection-contamination-03

- Initial signal: first request appears to choose backend state for later authorities
- Required evidence: behavior is not explained by DNS, cache, or load-balancer variance
- Primary false positive: cache or redirect behavior unrelated to connection state
- Safety gate: manual approval before contamination checks

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0395 | Varnish cache | WAF bypass |
| RS-MEM-0396 | Fastly shield | response queue poisoning |
