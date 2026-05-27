# HTTP Request Smuggling Decision Trees

## Tree 1 - Scanner output

1. Is there a raw request/response and real protocol evidence? If not, `needs_more_evidence`.
2. Is there a front-end/back-end boundary or protocol translation? If not, evaluate CL.0/client-side or discard classic
smuggling.
3. Is there behavior that survives without self-pipelining? If not, apply the false-positive control.
4. Is there impact beyond a surprising response for the researcher? If not, treat it as inventory or discrepancy-only.

## Tree 2 - HTTP/2 edge

1. Confirm ALPN and whether the edge accepted HTTP/2.
2. Look for downgrade signals to an HTTP/1 origin.
3. Check pseudo-headers, :authority/Host, TE, Content-Length, and CRLF/header-name injection.
4. If HTTP/2 is end-to-end, downgrade the H2-downgrade hypothesis and look for another class.

## Tree 3 - Connection reuse anomaly

1. Disable client reuse when possible.
2. If it breaks, suspect a pipelining false positive.
3. If it only works with reuse, evaluate connection-locked, connection-state, or client-side desync.
4. Require impact via cache, header leak, or front-end control bypass.

## Tree 4 - Cache impact

1. Identify the cache layer and cache key.
2. Use a disposable route or unguessable key.
3. Capture HIT/MISS/Age and hash before/after.
4. If there is no shared storage, do not call it cache poisoning.

## Tree 5 - Protocol transition

1. Is there Upgrade, CONNECT, HTTP/2 CONNECT, connect-udp, WebSocket, h2c, RFC 2817, or opportunistic TLS?
2. Does the client/proxy send bytes before confirmation?
3. Does the server reject but keep HTTP/1.1 interpretation?
4. Is there trusted-client or connection-level auth impact?

## Tree 6 - Chunked and TE-derived parser differentials

1. Is the signal TE.0, dechunking, chunk extension, chunk terminator, chunk spillover, or trailer newline behavior?
2. Separate the root boundary from gadgets such as response concatenation or TRACE reflection.
3. Compare canonical chunked behavior with the suspect parser behavior before naming impact.
4. If only generic invalid-chunk rejection is visible, downgrade to `needs_more_evidence`.

## Tree 7 - HTTP/3 connection state

1. Confirm the client actually used HTTP/3 and did not silently fall back.
2. Identify whether connection coalescing, first-request routing, or sibling-domain authority state is in play.
3. Compare same-connection behavior with fresh-connection behavior.
4. If the only difference is cache, redirect, DNS, or load-balancer variance, route away from smuggling.

## Tree 8 - Reportability

1. Is the scope authorized?
2. Is the root cause named?
3. Impact with owned data?
4. Were false-positive controls executed?
5. Actionable mitigation?
