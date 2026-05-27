# Mission and Mental Model

This skill covers classic request smuggling, HTTP/2 downgrade, HTTP/3-to-origin translation,
browser-powered desync, CL.0, pause-based desync, request tunnelling/request tunneling, response queue
poisoning, cache poisoning chains, hop-by-hop header confusion, protocol transition smuggling, and parsing
discrepancies across WAF/CDN/proxy/origin boundaries.

The decision must be based on parser-boundary evidence. A string such as `Transfer-Encoding`, an isolated
400 response, or scanner output is not enough. The correct output is a packet with architecture, variant,
minimum evidence, challenged false positive, stop condition, and manual-gated proof contract.

## 2. Mental model

Request smuggling happens when two participants in the HTTP chain disagree about a message boundary or
about which message is being processed. The main question is: which hop believes the request ends at one
point, which hop believes it ends somewhere else, and what controlled impact arises from that divergence?

- `front-end`: component receiving the client: CDN, WAF, ALB, reverse proxy, API gateway, ingress, service mesh, cache, or web server.
- `back-end`: component processing the forwarded version: origin server, framework, upstream proxy, app server, HTTP worker, or cache shield.
- `framing source`: Content-Length, Transfer-Encoding, implicit-zero, HTTP/2 DATA frame length, HTTP/3 stream boundary, connection close, timeout, Upgrade/CONNECT transition.
- `normalization`: header canonicalization, hop-by-hop removal, pseudo-header conversion, Host/:authority mapping, path/request-target rewrite, dechunking, buffering.
- `queue`: persistent connection, upstream connection pool, client connection reuse, response queue, cache key, stream mapping, or tunnel.
- `impact`: front-end bypass, cache poisoning, header leak, response queue poisoning, request prefix against another request, account/session impact, or inventory only.
