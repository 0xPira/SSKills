# Procedural Memory: h2c cleartext upgrade smuggling

These entries are context prompts, not payload recipes. Use them to reason about evidence, false positives, and proof contracts.

This compact view is generated from [card-matrix.json](./card-matrix.json). It preserves each case ID, surface, candidate impact, initial signal, required evidence, primary false positive, and safety gate while removing repeated boilerplate.

## Context Groups

### h2c-cleartext-upgrade-smuggling-01

- Initial signal: h2c advertised or accepted on a proxy-facing route
- Required evidence: front-end policy differs from backend protocol acceptance
- Primary false positive: h2c only enabled on a lab or internal listener
- Safety gate: inventory first

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0381 | reverse proxy | host routing confusion |
| RS-MEM-0382 | API gateway | cache poisoning |
| RS-MEM-0383 | AWS ALB | auth/session impact |

### h2c-cleartext-upgrade-smuggling-02

- Initial signal: Upgrade h2c or HTTP2-Settings reaches an unintended hop
- Required evidence: h2c path reaches a route blocked over ordinary HTTP/1.1
- Primary false positive: TLS ALPN h2 confused with cleartext h2c
- Safety gate: manual upgrade probes only

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0384 | Cloudflare/Pingora proxy | header disclosure |
| RS-MEM-0385 | HAProxy frontend | front-end ACL bypass |
| RS-MEM-0386 | Envoy/Istio gateway | host routing confusion |

### h2c-cleartext-upgrade-smuggling-03

- Initial signal: HTTP/2 CONNECT or cleartext tunnel crosses a front-end boundary
- Required evidence: proxy logs or protocol inventory show where upgrade is handled
- Primary false positive: proxy closes or fully terminates the upgrade safely
- Safety gate: no third-party tunnel targets

| RS-MEM ID | Surface | Candidate impact |
| --- | --- | --- |
| RS-MEM-0387 | NGINX upstream | inventory only |
| RS-MEM-0388 | Varnish cache | request queue poisoning |
