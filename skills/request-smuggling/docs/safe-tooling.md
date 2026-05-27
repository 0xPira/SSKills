# Safe Tooling

- Burp Repeater: useful for baselines and HTTP/2 toggling, but connection reuse can create false positives; record when it is enabled.
- HTTP Request Smuggler: useful for research and detection, but outputs need a proof contract; do not accept an issue automatically.
- Turbo Intruder: necessary for pause-based research, but it must run with minimal concurrency and manual approval.
- curl/nghttp/h2c tools: good for protocol inventory, not broad fuzzing in production. h2c upgrade probes stay manual-gated.
- Browser DevTools: good for confirming whether the browser uses HTTP/2/3, fetch constraints, redirects, and cache.
- Owned/lab server logs: the best evidence for distinguishing proxy parsing, origin parsing, and application behavior.
- Packet capture in a controlled lab: preferable before any active validation against a real target.
- TRACE checks: use only to understand reflection, response concatenation, or header removal after a separately named boundary.
- HTTP/3 tools: compare same-connection and fresh-connection behavior; keep sibling-domain tests inside explicit scope.
- Agent or executor integrations: keep automatic actions read-only; any malformed framing, body ambiguity, pause, queue, or cache poisoning test stays manual-gated.
