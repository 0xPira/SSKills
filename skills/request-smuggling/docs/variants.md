# Variant Taxonomy

### 4.1 CL.TE
Front-end honors Content-Length while back-end honors Transfer-Encoding.

- Input signals:
  - conflicting length metadata
  - front-end forwards ambiguous body
  - back-end decodes chunked framing
- Strong evidence:
  - 400/408/502 patterns differ by path
  - front-end strips or preserves TE
  - same request over isolated connection still yields parser disagreement
- False positives to rule out:
  - ordinary TE rejection
  - body buffering timeout
  - WAF block before origin
- Safety/proof contract:
  - manual malformed framing only
  - no victim traffic
  - one in-scope route
  - abort on elevated 5xx rate
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.2 TE.CL
Front-end honors Transfer-Encoding while back-end honors Content-Length.

- Input signals:
  - chunked body accepted at edge
  - origin appears to consume fixed length
  - unconsumed bytes can become next request prefix
- Strong evidence:
  - edge and origin disagree about final chunk
  - backend response timing differs from edge response
  - connection close behavior is stable
- False positives to rule out:
  - proxy dechunks before origin
  - origin rejects chunked bodies
  - client-side pipelining artifact
- Safety/proof contract:
  - manual malformed framing only
  - strict request budget
  - dedicated test host when possible
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.3 TE.TE
Both layers claim Transfer-Encoding support, but one layer ignores an obfuscated or duplicated TE value.

- Input signals:
  - non-canonical TE token
  - duplicate Transfer-Encoding fields
  - case or whitespace tolerant parser
- Strong evidence:
  - front-end and back-end normalize TE differently
  - single canonical TE is rejected or normalized
  - differential survives non-reused client connection
- False positives to rule out:
  - generic invalid header rejection
  - scanner-only label
  - legacy proxy removes unknown transfer codings
- Safety/proof contract:
  - manual only
  - record exact normalization
  - do not fuzz production broadly
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.4 duplicate Content-Length
Two Content-Length values are parsed, merged, rejected, or selected differently.

- Input signals:
  - duplicate CL fields
  - comma-joined CL values
  - empty or signed CL
  - overflow or leading plus/minus
- Strong evidence:
  - one hop rejects while another forwards
  - logs show duplicate handling
  - vendor/advisory maps to parser behavior
- False positives to rule out:
  - client library canonicalized before sending
  - proxy rejects before origin
  - A/B backend pool variation
- Safety/proof contract:
  - manual malformed framing only
  - no automated permutation spray
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.5 invalid Content-Length
A parser accepts a body length another parser rejects or normalizes.

- Input signals:
  - blank CL
  - leading whitespace
  - non-digit suffix
  - very large value
  - integer wrap risk
- Strong evidence:
  - close/reject policy differs
  - connection reuse after invalid CL
  - origin parser family known to be lenient
- False positives to rule out:
  - normal timeout
  - rate limiter response
  - body too large protection
- Safety/proof contract:
  - manual only
  - small benign bodies
  - abort on timeout accumulation
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.6 CL.0
Server responds without consuming a body promised by Content-Length, leaving bytes for a later request.

- Input signals:
  - endpoint ignores request body
  - status generated before body read
  - connection kept alive after early response
- Strong evidence:
  - body suffix affects next request only after server response
  - endpoint-specific behavior
  - HTTP/1.1 reuse prerequisite
- False positives to rule out:
  - browser/client pipelining illusion
  - server closes connection after response
  - only self-visible surprising response
- Safety/proof contract:
  - manual only
  - isolate connection
  - prove impact beyond self-observation
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.7 0.CL
One hop treats a request as zero-length while a downstream hop consumes Content-Length.

- Input signals:
  - implicit-zero interpretation
  - method/body mismatch
  - GET/HEAD/OPTIONS body handling discrepancy
- Strong evidence:
  - front-end forwards body even when policy says no body
  - back-end waits or consumes body
  - method-specific behavior is reproducible
  - double-desync or early-response gadget is separated from the root 0.CL boundary
- False positives to rule out:
  - application ignores body safely
  - proxy blocks methods with body
  - normal 411/400 response
- Safety/proof contract:
  - manual only
  - no body flood
  - method allowlist respected
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.8 H2.CL
HTTP/2 message has frame length semantics but carries a Content-Length that is mishandled during downgrade.

- Input signals:
  - HTTP/2 edge
  - HTTP/1 origin
  - Content-Length retained after downgrade
- Strong evidence:
  - downgraded request preserves attacker-controlled CL
  - edge calculates body length differently
  - Burp/h2 capable client evidence
- False positives to rule out:
  - HTTP/2 used end-to-end
  - edge validates CL against DATA frames
  - origin not reachable through downgrade
- Safety/proof contract:
  - manual HTTP/2 tooling only
  - no browser victim
  - route through approved test account
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.9 H2.TE
HTTP/2 request contains forbidden or ambiguous Transfer-Encoding semantics that survive downgrade.

- Input signals:
  - TE header other than trailers
  - downgrade creates Transfer-Encoding on HTTP/1
  - edge fails to reject
- Strong evidence:
  - HTTP/2 endpoint accepts illegal TE
  - origin receives chunked or TE-like header
  - normal HTTP/2 path differs from HTTP/1 path
- False positives to rule out:
  - client displayed request as HTTP/1 but sent HTTP/1
  - edge strips TE
  - endpoint only supports h2 end-to-end
- Safety/proof contract:
  - manual only
  - record actual wire protocol
  - no broad TE mutation
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.10 H2.0
HTTP/2 edge/origin path can be made to ignore a body or treat DATA frames as zero-length equivalent.

- Input signals:
  - HTTP/2 request accepted without origin body consumption
  - server responds early
  - connection or stream reuse prerequisite
- Strong evidence:
  - response emitted before DATA is consumed
  - follow-up request behavior changes
  - same endpoint over HTTP/1 behaves differently
- False positives to rule out:
  - flow-control artifact
  - client cancellation
  - normal HTTP/2 stream reset
- Safety/proof contract:
  - manual only
  - stream-level evidence required
  - abort on reset storms
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.11 HTTP/2 request splitting
Downgrade logic lets newline, pseudo-header or method/path content split a generated HTTP/1 request.

- Input signals:
  - CRLF in translated field
  - ambiguous :path
  - ambiguous :authority
  - method injection
- Strong evidence:
  - downstream request line or headers differ from HTTP/2 semantics
  - proxy rewrites are observable through reflection/header leak
  - vendor history supports vector
- False positives to rule out:
  - frontend rejects malformed pseudo-headers
  - display-only newline escaping
  - application reflection not proxy splitting
- Safety/proof contract:
  - manual only
  - no full smuggled request automation
  - route to host-header/cache/XSS if impact shifts
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.12 HTTP request tunnelling
A single client request causes the back-end to produce two responses or process a hidden inner request without
cross-user queue poisoning.

- Input signals:
  - two responses behind one front-end request
  - HEAD/non-blind oracle
  - front-end security bypass
- Strong evidence:
  - second response can reveal internal headers or bypass front-end path policy
  - works without victim traffic
  - connection reuse policy explained
- False positives to rule out:
  - HTTP/1 pipelining false positive
  - testing client reused connection
  - debug server sends extra response
- Safety/proof contract:
  - manual only
  - disable connection reuse first
  - prove impact not just anomaly
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.13 response queue poisoning
Back-end responses become associated with the wrong front-end request.

- Input signals:
  - shifted response order
  - unexpected response body for baseline request
  - cross-user or self-controlled response queue
- Strong evidence:
  - queue shift persists for following request
  - victim-free proof with paired test accounts
  - response hash mismatch not explained by cache
- False positives to rule out:
  - cache variant
  - load-balanced backend change
  - client pipelining artifact
- Safety/proof contract:
  - manual only
  - owned test accounts
  - no third-party data
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.14 connection-locked request smuggling
Smuggling only manifests when the client-side connection is reused because the front-end maps client
connection reuse to upstream reuse.

- Input signals:
  - attack fails with client connection reuse disabled
  - succeeds with same client connection
  - HTTP/2 nested HTTP/1 response evidence
- Strong evidence:
  - nested response inside HTTP/2 response
  - impact via cache, header leak or front-end control bypass
  - not just surprising self-response
- False positives to rule out:
  - ordinary pipelining
  - tool requestsPerConnection artifact
  - same-server direct path
- Safety/proof contract:
  - manual only
  - explicitly label connection-locked
  - do not claim cross-user unless proven
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.15 connection state attack
A front-end connection remembers state such as Host, auth, routing, SNI, prior header or upgrade expectation
across requests.

- Input signals:
  - stateful routing
  - Host filter bypass
  - prior request affects later request
  - connection-bound auth
- Strong evidence:
  - state mutation on same connection
  - control request then probe request sequence
  - impact without parser boundary confusion
- False positives to rule out:
  - session cookie state
  - normal keep-alive behavior
  - tool grouping artifact
- Safety/proof contract:
  - manual only
  - route to host-header/auth when primary issue is not smuggling
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.16 client-side desync
Victim browser desynchronizes its own connection to a vulnerable HTTP/1.1 server using browser-compatible
requests.

- Input signals:
  - server responds before reading body
  - browser can issue cross-origin request
  - HTTP/1.1 connection reuse
  - target lacks HTTP/2 for victim path
- Strong evidence:
  - browser PoC possible only with approval
  - endpoint early-response behavior
  - impact gadget exists
- False positives to rule out:
  - CORS-only issue
  - HTTP/2 used by browser
  - server closes connection after early response
- Safety/proof contract:
  - manual gate
  - no real victim
  - test browser/profile only
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.17 browser-powered server-side desync
Browser-compatible request causes a server-side front-end/back-end desync.

- Input signals:
  - browser can trigger prefix
  - front-end streams to origin
  - origin leaves bytes queued
- Strong evidence:
  - same-origin or cross-origin browser constraints understood
  - test account impact path exists
  - no raw malformed request required
- False positives to rule out:
  - browser cannot send required headers
  - CORS preflight changes method
  - HTTP/2 prevents connection reuse
- Safety/proof contract:
  - manual gate
  - no victim traffic
  - browser lab first
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.18 pause-based desync
A pause after headers changes parser state because one hop times out before another.

- Input signals:
  - headers sent then delayed body
  - read timeout asymmetry
  - connection left open after timeout
- Strong evidence:
  - front-end streams partial request
  - back-end response before promised body
  - late body affects later parsing
- False positives to rule out:
  - slowloris/DoS behavior
  - front-end timeout first
  - backend closes connection
- Safety/proof contract:
  - manual gate
  - strict timeout budget
  - single route, low concurrency
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.19 hop-by-hop header confusion
Connection header names cause a hop to remove or retain security-critical headers incorrectly.

- Input signals:
  - Connection names Transfer-Encoding, X-Forwarded-For, Host-like, auth-like headers
  - custom hop-by-hop stripping
  - proxy chain
- Strong evidence:
  - one hop removes field another depends on
  - Akamai-style Connection: Transfer-Encoding bug class
  - origin receives improper framing or loses security header
- False positives to rule out:
  - application ignores header
  - proxy strips all hop-by-hop safely
  - header is end-to-end by design
- Safety/proof contract:
  - manual only
  - metadata proof first
  - route access-control if auth bypass is primary
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.20 Expect: 100-continue / interim response
One hop honors or suppresses interim response semantics differently.

- Input signals:
  - Expect header
  - OPTIONS or POST with body
  - interim 100 behavior
  - Expect complexity bomb behavior
  - response header removal dependency
  - obs-fold combination
- Strong evidence:
  - front-end and in-path server disagree before body
  - Akamai CVE-2025-32094 style pattern
  - connection state after reject is defined
  - response header stripping or interim-response handling changes downstream parsing
- False positives to rule out:
  - client library auto-handles Expect
  - server returns ordinary 417
  - body never forwarded
  - response header removal is consistent across both hops
- Safety/proof contract:
  - manual only
  - no large body
  - abort on timeout
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.21 Upgrade / CONNECT optimistic transition
Client/proxy forwards post-transition bytes before knowing whether HTTP/1.1 upgrade or CONNECT succeeded.

- Input signals:
  - Upgrade token
  - CONNECT
  - HTTP/2 CONNECT tunnel
  - connect-udp
  - h2c cleartext upgrade
  - RFC 2817 or opportunistic TLS upgrade path
  - rejected transition
  - connection-level auth
- Strong evidence:
  - server interprets optimistic bytes as HTTP/1.1 after reject
  - RFC 9931 risk model applies
  - RFC 2817 or opportunistic TLS handling explains when HTTP parsing should stop
  - proxy client forwards untrusted bytes
- False positives to rule out:
  - WebSocket compliant wait
  - HTTP/2/HTTP/3 stream isolation
  - cleartext h2c disabled or normalized before forwarding
  - server closes on reject
- Safety/proof contract:
  - manual only
  - lab or owned proxy first
  - no third-party TCP targets
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.22 HTTP/1.0 + Transfer-Encoding
A component accepts Transfer-Encoding in HTTP/1.0 or treats close-delimited request bodies inconsistently.

- Input signals:
  - HTTP/1.0 request with TE
  - close-delimited body
  - legacy backend
- Strong evidence:
  - proxy/origin disagree on whether body ends at close
  - Pingora 2026 class applies
  - strict parsers reject
- False positives to rule out:
  - server upgrades to HTTP/1.1 internally
  - connection closed prevents queue impact
  - intermediary normalized version
- Safety/proof contract:
  - manual only
  - single low-volume probe after approval
  - record version line
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.23 HTTP/3 to HTTP/1 boundary
HTTP/3/QUIC stream semantics are translated to HTTP/1.1 origin semantics incorrectly.

- Input signals:
  - HTTP/3 edge
  - HTTP/1 origin
  - QPACK field handling
  - QUIC stream FIN interpretation
- Strong evidence:
  - edge supports h3 but origin receives h1
  - translation preserves ambiguous field or premature end
  - vendor/research evidence maps to implementation
- False positives to rule out:
  - HTTP/3 used end-to-end
  - edge validates and normalizes before origin
  - client fallback to HTTP/2/1 misread
- Safety/proof contract:
  - manual research-only
  - no automated h3 fuzzing
  - vendor docs first
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.24 cache poisoning desync chain
Desync changes the response cached for a different key or makes cache store attacker-influenced content.

- Input signals:
  - cache layer
  - unkeyed header
  - origin shield
  - response queue shift
  - cache HIT after anomaly
- Strong evidence:
  - poison affects disposable cache key
  - Age/CF-Cache-Status/X-Cache evidence
  - cache purge or isolated path available
- False positives to rule out:
  - normal cache variation
  - private/no-store response
  - browser cache only
- Safety/proof contract:
  - manual gate
  - use unguessable disposable path
  - purge/expiry plan
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.25 WAF / ACL bypass via parser discrepancy
Security layer blocks one parsed request but origin receives another interpretation.

- Input signals:
  - front-end WAF
  - ACL path block
  - JSON/form/multipart parser mismatch
  - request body normalization discrepancy
- Strong evidence:
  - blocked control path becomes reachable through parser disagreement
  - WAFFLED-style content parser mismatch considered
  - origin action is safe/read-only
- False positives to rule out:
  - WAF allowlist by design
  - application route public
  - scanner generated synthetic bypass without origin proof
- Safety/proof contract:
  - manual only
  - read-only target route
  - route to injection/access-control if impact class changes
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.26 host routing / virtual host desync
Different layers derive authority, Host, :authority, SNI or absolute-form target differently.

- Input signals:
  - Host/:authority mismatch
  - absolute-form target
  - X-Forwarded-Host
  - TLS SNI mismatch
  - cache service selection
- Strong evidence:
  - front-end and origin select different virtual hosts
  - cache key differs from origin host
  - reset/password or tenant host impact path
- False positives to rule out:
  - normal multi-tenant routing
  - redirect canonicalization
  - client display mismatch
- Safety/proof contract:
  - manual only
  - route to host-header review for impact
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.27 trailer and TE: trailers boundary
A hop mishandles chunk trailers or HTTP/2 TE: trailers during translation.

- Input signals:
  - Trailer header
  - chunked trailers
  - TE: trailers
  - signature headers in trailer
  - trailer-section newline boundary
  - TRAIL.TERM or TERM.TRAIL style terminator confusion
- Strong evidence:
  - security decision ignores/accepts trailer differently
  - origin receives trailer promoted to header
  - front-end strips or forwards
  - request joining or response concatenation follows trailer termination
- False positives to rule out:
  - trailers ignored consistently
  - trailers only used for logging
  - client library never sends
  - trailer parsing is identical at every hop
- Safety/proof contract:
  - manual only
  - do not smuggle secrets
  - metadata proof first
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.28 TE.0 / dechunking smuggling
One hop dechunks or strips Transfer-Encoding while a downstream hop treats the forwarded request as zero-length, close-delimited, or otherwise differently delimited.

- Input signals:
  - edge or proxy dechunking policy
  - Transfer-Encoding removed before origin
  - downstream zero-length or implicit-body behavior
  - V-H or H-V parser discrepancy around body presence
- Strong evidence:
  - hop-specific metadata shows dechunking before forwarding
  - origin behavior differs from a canonical chunked control
  - connection close/reuse behavior explains where leftover bytes can exist
- False positives to rule out:
  - ordinary TE rejection at the first hop
  - proxy buffers and rewrites a clean Content-Length
  - origin never receives the request body
- Safety/proof contract:
  - manual malformed framing only
  - no broad TE mutation
  - isolate route and connection
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.29 chunked parser differentials
Recipients disagree about chunk size, chunk extension, chunk terminator, spillover, or trailer parsing.

- Input signals:
  - chunk extension accepted by one hop and rejected by another
  - TERM.EXT or EXT.TERM style terminator order discrepancy
  - TERM.SPILL or SPILL.TERM style spillover around the terminating chunk
  - two-byte terminator overread or trailer-section newline confusion
- Strong evidence:
  - front-end and origin disagree on where chunked body parsing ends
  - benign canonical chunked controls behave normally
  - differential is mapped to a named parser family or observed hop
- False positives to rule out:
  - generic invalid chunk rejection
  - client library normalized chunk syntax before sending
  - body buffering removes all chunk syntax before origin
- Safety/proof contract:
  - manual research-only
  - one route and one connection family at a time
  - abort on repeated parse errors or 5xx
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.30 h2c cleartext upgrade smuggling
A cleartext HTTP/1.1 Upgrade to HTTP/2 is accepted, forwarded, or tunneled differently by a proxy chain.

- Input signals:
  - h2c advertised or accepted on a proxy-facing route
  - Upgrade: h2c or HTTP2-Settings reaches an unintended hop
  - HTTP/2 CONNECT or cleartext tunnel behavior crosses a front-end boundary
- Strong evidence:
  - front-end policy differs from backend protocol acceptance
  - h2c path reaches a route blocked over ordinary HTTP/1.1
  - proxy logs or protocol inventory show where upgrade is handled
- False positives to rule out:
  - h2c only enabled on a lab or internal listener
  - TLS ALPN h2 confused with cleartext h2c
  - proxy closes or fully terminates the upgrade safely
- Safety/proof contract:
  - inventory first
  - manual upgrade probes only
  - no third-party tunnel targets
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.31 HTTP/3 connection contamination
Connection coalescing, first-request routing, or authority state on an HTTP/3 connection lets one origin influence another.

- Input signals:
  - HTTP/3 edge with connection coalescing
  - sibling domains share a certificate or edge connection
  - first request appears to choose backend state for later authorities
- Strong evidence:
  - same connection routes two authorities differently than fresh connections
  - authority or routing state survives across independent H3 streams
  - behavior is not explained by DNS, cache, or load-balancer variance
- False positives to rule out:
  - client silently fell back to HTTP/2 or HTTP/1.1
  - normal wildcard certificate coalescing without backend confusion
  - cache or redirect behavior unrelated to connection state
- Safety/proof contract:
  - passive and owned-domain inventory first
  - no sibling-domain testing outside scope
  - manual approval before contamination checks
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.32 TRACE-assisted desync gadget
TRACE or reflection-like response behavior helps reveal hidden responses, stripped headers, or response concatenation after a desync boundary.

- Input signals:
  - TRACE enabled through a proxy chain
  - reflected request headers reveal front-end changes
  - response concatenation or hidden second response is visible
- Strong evidence:
  - TRACE is only a gadget; the root parser differential is named separately
  - response header removal or concatenation explains what became visible
  - same signal is absent on a fresh isolated connection
- False positives to rule out:
  - TRACE is blocked or only reflects the visible request
  - reflection is application-level debug behavior
  - response concatenation is client-side pipelining output
- Safety/proof contract:
  - manual only
  - metadata and hashes only for reflected data
  - stop on sensitive reflected headers
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.

### 4.33 opportunistic TLS / RFC 2817 desync
Upgrade-to-TLS or opportunistic TLS handling creates disagreement about when HTTP/1.1 parsing stops, resumes, or closes.

- Input signals:
  - RFC 2817 style Upgrade path
  - opportunistic TLS between proxy and origin
  - reject or partial transition keeps the connection reusable
- Strong evidence:
  - one hop believes the connection changed protocol while another continues HTTP/1.1 parsing
  - close-on-reject behavior differs between hops
  - Opossum-style trusted-client assumptions are relevant to the route
- False positives to rule out:
  - TLS upgrade not enabled on the path
  - transition succeeds cleanly and no HTTP parsing resumes
  - connection closes before any follow-up interpretation
- Safety/proof contract:
  - lab or owned proxy first
  - manual transition probes only
  - no third-party tunnel or victim traffic
- Routing:
  - If the primary impact is cache-related, route to web-cache.
  - If the primary impact is Host/:authority-related, route to host-header.
  - If the primary impact is auth/session/tenant-related, route to authentication/access-control.
  - If the primary impact is a parser boundary without impact proof, keep it in request_smuggling.
