# HTTP Request Smuggling Foundation

This document is the conceptual base loaded with the principal arsenal.

## Principles

- Request smuggling is a consistency failure between HTTP recipients.
- HTTP/1.1 is especially sensitive because sequential messages share a connection and their boundaries are textual.
- HTTP/2 and HTTP/3 reduce ambiguity when used end-to-end, but downgrades to HTTP/1.1 recreate or expand the surface.
- The playbook must prefer root-cause proof over symptomatic proof.
- The playbook must reject scanner-only, timing-only, and self-pipelining-only claims.

## Parser Discrepancy Terms

- V-H means a visible front-end recipient accepts or exposes a request shape that a hidden downstream recipient parses differently.
- H-V means a hidden downstream recipient accepts or acts on a request shape that the visible recipient rejected, ignored, or normalized away.
- These terms describe which parser saw which interpretation; they do not replace the variant name or the proof contract.
- A gadget such as TRACE response concatenation is evidence or impact plumbing unless it also proves the root parser boundary.

## Variants that must never be missing

- CL.TE: Front-end honors Content-Length while back-end honors Transfer-Encoding.
- TE.CL: Front-end honors Transfer-Encoding while back-end honors Content-Length.
- TE.TE: Both layers claim Transfer-Encoding support, but one layer ignores an obfuscated or duplicated TE value.
- duplicate Content-Length: Two Content-Length values are parsed, merged, rejected, or selected differently.
- invalid Content-Length: A parser accepts a body length another parser rejects or normalizes.
- CL.0: Server responds without consuming a body promised by Content-Length, leaving bytes for a later request.
- 0.CL: One hop treats a request as zero-length while a downstream hop consumes Content-Length.
- H2.CL: HTTP/2 message has frame length semantics but carries a Content-Length that is mishandled during downgrade.
- H2.TE: HTTP/2 request contains forbidden or ambiguous Transfer-Encoding semantics that survive downgrade.
- H2.0: HTTP/2 edge/origin path can be made to ignore a body or treat DATA frames as zero-length equivalent.
- HTTP/2 request splitting: Downgrade logic lets newline, pseudo-header or method/path content split a generated HTTP/1 request.
- HTTP request tunnelling: A single client request causes the back-end to produce two responses or process a hidden inner request without cross-user queue poisoning.
- response queue poisoning: Back-end responses become associated with the wrong front-end request.
- connection-locked request smuggling: Smuggling only manifests when the client-side connection is reused because the front-end maps client connection reuse to upstream reuse.
- connection state attack: A front-end connection remembers state such as Host, auth, routing, SNI, prior header or upgrade expectation across requests.
- client-side desync: Victim browser desynchronizes its own connection to a vulnerable HTTP/1.1 server using browser-compatible requests.
- browser-powered server-side desync: Browser-compatible request causes a server-side front-end/back-end desync.
- pause-based desync: A pause after headers changes parser state because one hop times out before another.
- hop-by-hop header confusion: Connection header names cause a hop to remove or retain security-critical headers incorrectly.
- Expect: 100-continue / interim response: One hop honors or suppresses interim response semantics differently.
- Upgrade / CONNECT optimistic transition: Client/proxy forwards post-transition bytes before knowing whether HTTP/1.1 upgrade or CONNECT succeeded.
- HTTP/1.0 + Transfer-Encoding: A component accepts Transfer-Encoding in HTTP/1.0 or treats close-delimited request bodies inconsistently.
- HTTP/3 to HTTP/1 boundary: HTTP/3/QUIC stream semantics are translated to HTTP/1.1 origin semantics incorrectly.
- cache poisoning desync chain: Desync changes the response cached for a different key or makes cache store attacker-influenced content.
- WAF / ACL bypass via parser discrepancy: Security layer blocks one parsed request but origin receives another interpretation.
- host routing / virtual host desync: Different layers derive authority, Host, :authority, SNI or absolute-form target differently.
- trailer and TE: trailers boundary: A hop mishandles chunk trailers or HTTP/2 TE: trailers during translation.
- TE.0 / dechunking smuggling: One hop dechunks or removes Transfer-Encoding while another hop treats the forwarded message as zero-length or differently delimited.
- chunked parser differentials: Chunk extension, terminator, spillover, or trailer parsing differs between recipients.
- h2c cleartext upgrade smuggling: A proxy or gateway mishandles HTTP/1.1 Upgrade to cleartext HTTP/2 and forwards privileged traffic into an unintended protocol context.
- HTTP/3 connection contamination: H3 connection coalescing or first-request routing lets one authority influence another authority on the same connection.
- TRACE-assisted desync gadget: TRACE or reflection-like behavior helps reveal response concatenation, hidden responses, or stripped headers after a desync boundary.
- opportunistic TLS / RFC 2817 desync: Upgrade-to-TLS handling creates disagreement about when HTTP/1.1 parsing stops or resumes.

## Golden rules

- Without architecture, there is no conclusion.
- Without a parser differential, there is no classic smuggling.
- Without impact, there is at most discrepancy or inventory.
- Without a stop condition, there is no safe validation.
- Without manual approval, there is no malformed framing.

## Minimum evidence

- scope: Host, port, scheme, CDN zone, origin and test route must be in authorized scope.
- architecture_hypothesis: Name every parser hop: browser/client, edge, CDN, WAF, gateway, reverse proxy, cache, origin server, framework.
- protocols: Record negotiated ALPN, HTTP version at client, downgrade indicators and upstream protocol if known.
- baseline: Ordinary GET/HEAD or approved benign request with status, headers, content-type, length/hash, timing bucket and cache status.
- parser_differential: State which boundary differs: CL, TE, implicit zero, H2 length, H3 stream, pseudo-header, hop-by-hop, upgrade or timeout.
- connection_assumption: Say whether proof requires upstream reuse, client reuse, pipelining, tunnel, stream reuse or no reuse.
- impact_hypothesis: Map to WAF bypass, cache poisoning, queue poisoning, host routing, header leak, auth bypass or only inventory.
- negative_evidence: List benign explanations already checked: cache variance, A/B rollout, backend pool, WAF block, localization, auth state.
- manual_gate: Record approval status before malformed framing, timing pauses, queue poisoning or victim simulation.
- stop_condition: Abort criteria: out of scope, unexpected 5xx burst, elevated latency, third-party data, sensitive response, body persistence.
- redaction: Persist metadata, hashes and shapes; do not store private bodies, cookies, credentials or victim data.
- reproducibility: Use disposable routes, owned accounts and deterministic baselines; document cases that are connection-locked or inconclusive.
