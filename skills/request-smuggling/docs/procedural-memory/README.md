# Procedural Memory

The procedural memory is deduplicated, not reduced in scope. Every original RS-MEM context is preserved in [card-matrix.json](./card-matrix.json), and new public coverage is tracked as additional context. The per-variant Markdown files are compact human views over that matrix.

## Preservation Guarantees

- Original card contexts preserved: 360
- Public additions: 48
- Total current contexts: 408
- Variants covered: 24
- Surfaces covered: 20
- Candidate impact categories covered: 10
- Context groups after deduplication: 128
- Source content hash: `05a586bf0264ff4bb721bcf4df3738c9e257b5616f446a77ae50b75de0c98084`

The only removed material is duplicated card scaffolding: repeated field labels, repeated objective question, repeated expected output, and repeated signal/evidence/false-positive/safety groups within a variant.

## How To Use These Cards

- Start with the decision trees and variant taxonomy before reading these files.
- Load only the file matching the current variant hypothesis.
- If the variant is still unknown, do not load all files; collect architecture evidence first.
- Treat the entries as reasoning examples, not as payload recipes.
- Prefer the proof contract over procedural memory when deciding whether active validation is allowed.

## Files

- [card-matrix.json](./card-matrix.json) - canonical deduplicated matrix with preserved originals and public additions.
- [0.CL](./0-cl.md) - 20 cases in 3 context groups
- [browser-powered server-side desync](./browser-powered-server-side-desync.md) - 20 cases in 3 context groups
- [chunked parser differentials](./chunked-parser-differentials.md) - 12 cases in 4 context groups
- [CL.0](./cl-0.md) - 20 cases in 3 context groups
- [CL.TE](./cl-te.md) - 20 cases in 12 context groups
- [client-side desync](./client-side-desync.md) - 20 cases in 12 context groups
- [connection state attack](./connection-state-attack.md) - 20 cases in 12 context groups
- [connection-locked request smuggling](./connection-locked-request-smuggling.md) - 20 cases in 3 context groups
- [duplicate Content-Length](./duplicate-content-length.md) - 20 cases in 12 context groups
- [H2.0](./h2-0.md) - 20 cases in 3 context groups
- [H2.CL](./h2-cl.md) - 20 cases in 3 context groups
- [H2.TE](./h2-te.md) - 20 cases in 3 context groups
- [h2c cleartext upgrade smuggling](./h2c-cleartext-upgrade-smuggling.md) - 8 cases in 3 context groups
- [HTTP request tunnelling](./http-request-tunnelling.md) - 20 cases in 3 context groups
- [HTTP/2 request splitting](./http-2-request-splitting.md) - 20 cases in 12 context groups
- [HTTP/3 connection contamination](./http3-connection-contamination.md) - 8 cases in 3 context groups
- [invalid Content-Length](./invalid-content-length.md) - 20 cases in 15 context groups
- [opportunistic TLS / RFC 2817 desync](./opportunistic-tls-rfc2817-desync.md) - 6 cases in 2 context groups
- [pause-based desync](./pause-based-desync.md) - 20 cases in 3 context groups
- [response queue poisoning](./response-queue-poisoning.md) - 20 cases in 3 context groups
- [TE.0 / dechunking smuggling](./te-0-dechunking-smuggling.md) - 8 cases in 3 context groups
- [TE.CL](./te-cl.md) - 20 cases in 3 context groups
- [TE.TE](./te-te.md) - 20 cases in 3 context groups
- [TRACE-assisted desync gadget](./trace-assisted-desync-gadget.md) - 6 cases in 2 context groups
