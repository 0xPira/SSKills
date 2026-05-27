# HTTP Request Smuggling Safety

## Hard gates

- Never automatically generate malformed HTTP framing.
- Never automatically send conflicting Content-Length/Transfer-Encoding.
- Never automatically pause mid-request to test timeout behavior.
- Never poison a shared cache or shared connection without explicit approval and isolation.
- Never use third-party or victim traffic as proof.
- Never persist sensitive response bodies; store metadata, hashes and shapes.
- Never continue after unexpected sensitive content or repeated 5xx.

## Allowed automatic activity

- Ordinary GET/HEAD baselines.
- Header inventory.
- Protocol support inventory.
- Cache header observation.
- Static config/source analysis.
- Hypothesis and proof-contract generation.

## Manual-only activity

- CL.TE: active validation requires manual approval.
- TE.CL: active validation requires manual approval.
- TE.TE: active validation requires manual approval.
- duplicate Content-Length: active validation requires manual approval.
- invalid Content-Length: active validation requires manual approval.
- CL.0: active validation requires manual approval.
- 0.CL: active validation requires manual approval.
- H2.CL: active validation requires manual approval.
- H2.TE: active validation requires manual approval.
- H2.0: active validation requires manual approval.
- HTTP/2 request splitting: active validation requires manual approval.
- HTTP request tunnelling: active validation requires manual approval.
- response queue poisoning: active validation requires manual approval.
- connection-locked request smuggling: active validation requires manual approval.
- connection state attack: active validation requires manual approval.
- client-side desync: active validation requires manual approval.
- browser-powered server-side desync: active validation requires manual approval.
- pause-based desync: active validation requires manual approval.
- hop-by-hop header confusion: active validation requires manual approval.
- Expect: 100-continue / interim response: active validation requires manual approval.
- Upgrade / CONNECT optimistic transition: active validation requires manual approval.
- HTTP/1.0 + Transfer-Encoding: active validation requires manual approval.
- HTTP/3 to HTTP/1 boundary: active validation requires manual approval.
- cache poisoning desync chain: active validation requires manual approval.
- WAF / ACL bypass via parser discrepancy: active validation requires manual approval.
- host routing / virtual host desync: active validation requires manual approval.
- trailer and TE: trailers boundary: active validation requires manual approval.
- TE.0 / dechunking smuggling: active validation requires manual approval.
- chunked parser differentials: active validation requires manual approval.
- h2c cleartext upgrade smuggling: active validation requires manual approval.
- HTTP/3 connection contamination: active validation requires manual approval.
- TRACE-assisted desync gadget: active validation requires manual approval.
- opportunistic TLS / RFC 2817 desync: active validation requires manual approval.
- Expect complexity bomb and response header removal bypass checks require manual approval.

## Stop conditions

- Out-of-scope infrastructure.
- Third-party backend or CDN zone not covered by program.
- Unexpected private data.
- Repeated 5xx or elevated latency.
- No cleanup for state/cache.
- Need for real victim traffic.
