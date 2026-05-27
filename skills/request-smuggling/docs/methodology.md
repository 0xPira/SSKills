# Safe Methodology

### 7.1 Inventory
Map possible parser boundaries without sending malformed traffic.

- Actions:
  - Collect ALPN, HTTP versions, CDN/WAF/proxy headers and cache headers.
  - Identify edge/origin families and whether HTTP/2/3 is only at the edge.
  - Find endpoints that accept bodies, redirects, uploads, APIs and server-generated early responses.
  - Tag potential cache, auth, host routing and WAF decision points.
- Stop conditions:
  - Any host or origin is out of scope.
  - The next step requires malformed framing.
  - Baseline traffic already causes instability.

### 7.2 Baseline
Build normal behavior evidence on owned routes.

- Actions:
  - Record status, content-type, length/hash, cache status and timing bucket.
  - Repeat with connection reuse disabled where tooling allows.
  - Compare HTTP/1.1, HTTP/2 and HTTP/3 only when ordinary requests are safe.
  - Separate route-level behavior from proxy-level behavior.
- Stop conditions:
  - Authentication expired.
  - A/B, localization or backend pool variance cannot be controlled.
  - Sensitive data appears in baseline.

### 7.3 Classify parser differential
Name the exact disagreement before planning active validation.

- Actions:
  - Choose one primary variant from taxonomy.
  - Identify front-end interpretation and back-end interpretation.
  - List the RFC rule or vendor behavior involved.
  - List why simpler explanations are weaker.
- Stop conditions:
  - No two parser hops are identified.
  - Only scanner output exists.
  - The suspected issue is actually cache, host header, CORS or access control.

### 7.4 Proof contract
Define success, inconclusive and abort conditions before any risky action.

- Actions:
  - Write request budget and rate budget.
  - Define target isolation and connection policy.
  - Define accepted evidence shapes.
  - Define cleanup/purge if cache or stored state may be touched.
- Stop conditions:
  - No rollback/purge path for stateful proof.
  - Proof needs third-party victim traffic.
  - The report value is unclear.

### 7.5 Manual validation
Execute only approved probes and preserve minimal evidence.

- Actions:
  - Use a controlled lab first when possible.
  - Use one route and one variant at a time.
  - Capture only metadata/hashes/shapes unless user-owned content is explicitly needed.
  - Stop after first conclusive evidence.
- Stop conditions:
  - Timeouts accumulate.
  - Unexpected cross-user/sensitive response appears.
  - The target returns repeated 5xx or rate-limit responses.

### 7.6 Impact chaining
Route the actual impact to the right domain review.

- Actions:
  - Cache poisoning routes to web-cache.
  - Host routing/password reset routes to host-header/authentication.
  - Header leak or ACL bypass routes to access-control/API security.
  - Reflected gadget routes to XSS only if rendering evidence exists.
- Stop conditions:
  - No impact beyond parser anomaly.
  - Exploit would require unsafe victim simulation.
  - Observed behavior is product-intended.

### 7.7 Reporting
Convert evidence into a precise, reproducible and bounded report.

- Actions:
  - Describe parser boundary and impact separately.
  - Include negative controls and safe reproduction constraints.
  - Avoid dumping payloads or sensitive bodies.
  - Provide root-cause mitigation not just WAF signature.
- Stop conditions:
  - Only tool output is available.
  - No in-scope impact can be shown.
  - Root cause cannot be distinguished from transient infrastructure issue.
