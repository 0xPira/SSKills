# Essential Normative Rules

### 3.1 RFC 9112 - HTTP/1.1 framing

- HTTP/1.1 delimits messages with a start-line, header section, empty line, and optional body.
- Parsers must operate on octets, not Unicode strings, because LF/CR ambiguity and invalid bytes become vulnerabilities when libraries disagree.
- Content-Length and Transfer-Encoding are length sources; when they appear together, Transfer-Encoding takes precedence and defensive intermediaries should treat the message as an error.
- Removing or forwarding an ambiguous message without closing the connection lets downstream components interpret leftover bytes as another request.
- Whitespace between the start-line and first header must be rejected or consumed without forwarding; forwarding can cause request smuggling.
- Obs-fold, bare CR, bare LF, invalid headers, and incomplete bodies must be treated as parse errors with close-on-error when an intermediary chain exists.
- Persistence, pipelining, and retry change the risk model: the vulnerability appears when bytes from one message influence the next message on the same connection.

### 3.2 RFC 9113 - HTTP/2 translation

- HTTP/2 uses frames and stream IDs; the body boundary is the sum of DATA frames, not Content-Length as the primary mechanism.
- TE in HTTP/2 may only have the value `trailers`; other values must be rejected, not forwarded to HTTP/1.1.
- Connection-specific headers do not belong in HTTP/2 and must be removed during transformations.
- Pseudo-headers are control fields, not ordinary headers; order, duplication, and validity matter.
- :authority should drive Host when converting to HTTP/1.1; divergent Host values must be rejected or normalized with a clear rule.
- HTTP/2 downgrading creates a critical surface because it transforms binary frames into textual HTTP/1.1.

### 3.3 RFC 9114 and RFC 9204 - HTTP/3 and QPACK

- HTTP/3 uses independent QUIC streams; each request-response pair consumes one stream.
- HTTP/3 replaces HPACK with QPACK; this reduces head-of-line blocking but does not eliminate the risk of poor translation to an HTTP/1.1 origin.
- The HTTP/3 security question is not `classic CL.TE`; it is whether H3/H2-to-H1 conversion preserves or creates boundary ambiguity.

### 3.4 RFC 2817 - HTTP/1.1 Upgrade to TLS

- RFC 2817 uses HTTP/1.1 Upgrade semantics to switch to TLS on the same connection.
- Any intermediary that forwards bytes before the upgrade result is known must define what happens on rejection.
- Defensive handling closes or fully drains the connection on failed upgrade so downstream HTTP parsing cannot resume on ambiguous bytes.

### 3.5 RFC 9931 - optimistic transitions

- In HTTP/1.1, Upgrade and CONNECT can change protocol on the same connection, but the client cannot assume success before the response.
- If a client/proxy sends bytes for the new protocol before knowing whether the transition was accepted, controlled bytes can be interpreted as HTTP/1.1 after rejection.
- Rejecting CONNECT/Upgrade without closing or without waiting for confirmation creates a modern request smuggling family.

### 3.6 CWE-444

- The root weakness is inconsistent interpretation of an HTTP message between two or more recipients.
- The finding must name the inconsistency, not just the symptom.
