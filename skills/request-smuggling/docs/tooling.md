# HTTP Request Smuggling Tooling Notes

## Tool posture

- Tools are evidence collectors, not truth sources.
- Every scanner finding needs architecture, protocol, false-positive and impact review.
- Prefer lab reproduction for parser research before target validation.

## Burp Suite

- Repeater can toggle HTTP/1 and HTTP/2; record actual protocol.
- Connection reuse settings can create false positives; document them.
- Grouped requests are useful for research but not proof by themselves.

## HTTP Request Smuggler

- Useful for parser discrepancy detection and variant discovery.
- Outputs must be reclassified by this playbook.
- Automated exploit generation is outside the allowed automatic lane.

## Turbo Intruder

- Useful for pause-based tests and deterministic sequencing.
- Must run with explicit approval, low concurrency and tight request budget.
- The result must be interpreted against false positive controls.

## Protocol inventory tools

- ALPN and HTTP version checks are safe when using ordinary requests.
- HTTP/2/3 support at edge does not prove origin protocol.
- Raw wire capture should be limited to owned/lab environments where possible.


## Chunked parser research

- Treat funky-chunk style findings as parser research until the exact hop and impact are named.
- Record whether the signal is chunk extension handling, terminator ordering, spillover, trailer parsing, or dechunking.
- Do not run broad chunk mutation campaigns against production.

## TRACE, h2c, and HTTP/3 tooling

- TRACE is a visibility gadget, not proof of smuggling by itself.
- h2c tools are appropriate for protocol inventory and lab reproduction before manual target checks.
- HTTP/3 connection contamination review needs same-connection versus fresh-connection controls.
