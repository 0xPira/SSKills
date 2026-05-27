# Impact, Severity, and Reportability

### 9.1 Inventory only
- Minimum evidence: Architecture shows possible boundary but no parser disagreement.
- Severity handling: Informational or not reportable unless program values architecture risk.
- Limit: never raise severity based on technique name alone without demonstrating boundary and impact.

### 9.2 Parser discrepancy
- Minimum evidence: Two hops parse framing differently, but no security impact yet.
- Severity handling: Needs proof of bypass, cache, header leak or queue impact.
- Limit: never raise severity based on technique name alone without demonstrating boundary and impact.

### 9.3 Front-end security bypass
- Minimum evidence: Smuggled/tunnelled request reaches route blocked at front-end.
- Severity handling: Often high if route is sensitive and proof is read-only.
- Limit: never raise severity based on technique name alone without demonstrating boundary and impact.

### 9.4 Header disclosure
- Minimum evidence: Origin reflection reveals internal headers injected by front-end.
- Severity handling: Severity depends on whether headers enable auth, routing or tenant escalation.
- Limit: never raise severity based on technique name alone without demonstrating boundary and impact.

### 9.5 Cache poisoning
- Minimum evidence: Poisoned response is stored for another user/cache key.
- Severity handling: High/critical when login, JS, API or auth-sensitive content is affected.
- Limit: never raise severity based on technique name alone without demonstrating boundary and impact.

### 9.6 Response queue poisoning
- Minimum evidence: Responses shift across users or test accounts.
- Severity handling: High/critical if private data or account actions are exposed.
- Limit: never raise severity based on technique name alone without demonstrating boundary and impact.

### 9.7 Request queue poisoning
- Minimum evidence: Prefix alters another request or app action.
- Severity handling: High/critical when cross-user state or credential flow is affected.
- Limit: never raise severity based on technique name alone without demonstrating boundary and impact.

### 9.8 Client-side desync
- Minimum evidence: Browser can poison its own connection and trigger gadget.
- Severity handling: High when account/session data or internal network pivot is demonstrated safely.
- Limit: never raise severity based on technique name alone without demonstrating boundary and impact.

### 9.9 WAF/parser bypass
- Minimum evidence: Security inspection sees harmless request while origin sees dangerous structure.
- Severity handling: Severity follows the downstream issue that becomes reachable.
- Limit: never raise severity based on technique name alone without demonstrating boundary and impact.

### 9.10 Protocol transition smuggling
- Minimum evidence: Rejected Upgrade/CONNECT causes trusted client bytes to be interpreted as HTTP.
- Severity handling: High if connection-level auth or proxy privileges are abused.
- Limit: never raise severity based on technique name alone without demonstrating boundary and impact.

### 9.11 TRACE-assisted visibility

- Minimum evidence: TRACE or reflection exposes response concatenation, hidden response shape, or proxy header removal after a separately named boundary.
- Severity handling: Severity follows the underlying desync impact; TRACE alone is usually hardening or misconfiguration.
- Limit: never report TRACE-assisted behavior as the root cause unless it creates impact without another boundary.

### 9.12 HTTP/3 connection contamination

- Minimum evidence: Same H3 connection state changes routing, authority, or backend selection compared with fresh connections.
- Severity handling: Severity follows host routing, tenant boundary, cache, or auth impact demonstrated with in-scope authorities.
- Limit: never use out-of-scope sibling domains or unrelated coalescing as proof.

### 9.13 Reporting requirements

- Declare the exact variant and parser boundary.
- Explain the front-end/back-end architecture or state that it is a hypothesis.
- Show normal baseline, negative evidence, and divergent behavior.
- Demonstrate impact with owned accounts and data, or label it as risk/inventory.
- Separate safe collection steps from approved manual steps.
- Redact cookies, tokens, Authorization, private response bodies, and tenant data.
- Include root-cause mitigation: strict parsing, end-to-end protocol alignment, close-on-error, cache isolation, and patch/config changes.
