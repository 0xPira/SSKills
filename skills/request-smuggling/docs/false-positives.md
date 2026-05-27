# False Positives and Controls

### 8.1 HTTP pipelining
- Why it misleads: Two responses are seen because the testing client pipelined requests on one client connection.
- Required control: Disable client connection reuse; verify whether anomaly survives isolated connections or becomes connection-locked.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.2 Keep-alive reuse artifact
- Why it misleads: Tool requestsPerConnection > 1 causes a surprising self-response.
- Required control: Repeat with one request per connection and independent sockets.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.3 Backend pool variance
- Why it misleads: Different origin nodes return different pages, hashes or errors.
- Required control: Pin route if possible, repeat ordinary baseline, inspect load-balancer/cookie affinity evidence.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.4 Cache variant
- Why it misleads: Cache HIT/MISS, Vary, language, device or cookie changes content.
- Required control: Capture cache headers and use unguessable disposable cache key.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.5 WAF block
- Why it misleads: Security layer blocks malformed-looking traffic before origin.
- Required control: Document as negative evidence unless origin parser disagreement is separately proven.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.6 Timeout/DoS behavior
- Why it misleads: Server times out or closes connection under slow/malformed request.
- Required control: Do not call smuggling unless connection remains reusable and impact path exists.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.7 HTTP/2 display confusion
- Why it misleads: Tool displays HTTP/2 request as HTTP/1.1 syntax.
- Required control: Record actual wire protocol and ALPN.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.8 Client library normalization
- Why it misleads: Browser/Burp/curl rewrites duplicate or invalid headers before sending.
- Required control: Use tooling evidence for raw wire form; avoid assuming display equals wire.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.9 Redirect chain
- Why it misleads: A redirect changes host/path/cache behavior.
- Required control: Record redirect policy and final destination; route to open redirect if primary issue shifts.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.10 Scanner-only issue
- Why it misleads: Automated scanner labels a possible CL.TE/TE.CL without reproducible metadata.
- Required control: Require raw request/response, timing, connection and architecture evidence.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.11 Third-party processor
- Why it misleads: CDN, image service, bot or integration outside program control handles the request.
- Required control: Mark out of scope/manual review unless program explicitly includes it.
- Expected result: if the control fails, downgrade to inconclusive or inventory.

### 8.12 Single-server direct path
- Why it misleads: No front-end/back-end parser boundary exists for classic smuggling.
- Required control: Consider CL.0/client-side desync separately; otherwise downgrade to inventory.
- Expected result: if the control fails, downgrade to inconclusive or inventory.
