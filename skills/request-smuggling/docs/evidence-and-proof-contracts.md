# Evidence and Proof Contracts

Every assessment must carry these fields. If an essential field is missing, the correct decision is
`needs_more_evidence`, not `confirmed`.

- `scope`: Host, port, scheme, CDN zone, origin and test route must be in authorized scope.
- `architecture_hypothesis`: Name every parser hop: browser/client, edge, CDN, WAF, gateway, reverse proxy, cache, origin server, framework.
- `protocols`: Record negotiated ALPN, HTTP version at client, downgrade indicators and upstream protocol if known.
- `baseline`: Ordinary GET/HEAD or approved benign request with status, headers, content-type, length/hash, timing bucket and cache status.
- `parser_differential`: State which boundary differs: CL, TE, TE.0/dechunking, chunked parser, implicit zero, H2 length, H3 stream/connection state, pseudo-header, hop-by-hop, upgrade, TRACE gadget or timeout.
- `connection_assumption`: Say whether proof requires upstream reuse, client reuse, pipelining, tunnel, stream reuse or no reuse.
- `impact_hypothesis`: Map to WAF bypass, cache poisoning, queue poisoning, host routing, header leak, auth bypass or only inventory.
- `negative_evidence`: List benign explanations already checked: cache variance, A/B rollout, backend pool, WAF block, localization, auth state.
- `manual_gate`: Record approval status before malformed framing, timing pauses, queue poisoning or victim simulation.
- `stop_condition`: Abort criteria: out of scope, unexpected 5xx burst, elevated latency, third-party data, sensitive response, body persistence.
- `redaction`: Persist metadata, hashes and shapes; do not store private bodies, cookies, credentials or victim data.
- `reproducibility`: Use disposable routes, owned accounts and deterministic baselines; document cases that are connection-locked or inconclusive.

## Hypothesis Schema

```yaml
request_smuggling_hypothesis:
  variant: CL.TE | TE.CL | TE.TE | TE.0 | chunked_parser_differential | CL.0 | 0.CL | H2.CL | H2.TE | H2.0 | h2c_upgrade | http3_connection_contamination | trace_assisted | tunnelling | response_queue | client_side_desync | pause_based | protocol_transition | hop_by_hop | cache_chain | waf_parser_gap | host_routing
  scope: in_scope | out_of_scope | third_party | manual_review
  entry_point: scheme://host/path
  front_end_hypothesis: cdn | waf | alb | reverse_proxy | gateway | ingress | service_mesh | cache | unknown
  back_end_hypothesis: origin_server | app_framework | upstream_proxy | worker | cache_shield | unknown
  protocol_path: http1 | h2_to_h1 | h3_to_h1 | h2_end_to_end | h3_end_to_end | unknown
  parser_boundary: content_length | transfer_encoding | te_0_dechunking | chunked_parser | implicit_zero | h2_length | h3_stream | h3_connection_state | pseudo_header | hop_by_hop | timeout | upgrade | connect | trace_gadget
  baseline_evidence_ids: []
  negative_evidence_ids: []
  false_positive_challenged: []
  impact_hypothesis: inventory | front_end_bypass | header_leak | cache_poisoning | queue_poisoning | auth_bypass | host_routing | chained
  manual_gate_required: true
  safe_next_step: ordinary_baseline | architecture_inventory | proof_contract_review | manual_lab_validation | reroute
```

## Proof Contract Schema

```yaml
desync_proof_contract:
  approval: explicit_manual_required
  target_isolation:
    host: in_scope
    account: owned_test_account
    route: disposable_or_read_only
    cache_key: unguessable_if_cache_is_involved
  request_budget:
    max_requests: small_fixed_number
    max_connections: one_or_few
    max_duration_seconds: bounded
    concurrency: 1
  allowed_observations:
    - status_code
    - content_type
    - response_length
    - response_hash
    - timing_bucket
    - cache_status
    - header_presence_without_secret_values
  success_conditions:
    - parser_boundary_evidence_matches_variant
    - benign_false_positive_is_weaker
    - impact_or_reportable_boundary_is_demonstrated
  inconclusive_conditions:
    - only_timeout_seen
    - only_scanner_output_seen
    - only_self_pipelining_seen
    - cache_or_backend_variance_uncontrolled
  abort_conditions:
    - out_of_scope_host_or_origin
    - unexpected_sensitive_response
    - repeated_5xx_or_latency_spike
    - third_party_or_victim_traffic_needed
    - state_change_without_rollback
```

## Contract Catalog

## Contract A - Passive architecture

- Allowed: GET/HEAD baselines, TLS/ALPN observation, headers, cache status, redirect metadata.
- Disallowed: malformed framing, ambiguous bodies, pauses, queue poisoning, victim simulation.
- Success: at least two parser hops or a protocol translation boundary are plausibly identified.

## Contract B - Manual parser differential

- Requires: explicit approval, disposable route, single concurrency, strict request budget.
- Evidence: raw wire form, status/timing/hash, connection close/reuse result, negative controls.
- Abort: repeated 5xx, unexpected sensitive content, out-of-scope origin, cache effect without purge.

## Contract C - Cache chain

- Requires: unguessable cache key, purge/expiry plan, no shared production route.
- Evidence: baseline MISS/HIT, poison attempt metadata, verification fetch metadata, cache headers.
- Abort: cache key touches real users, response contains private data, purge unavailable.

## Contract D - Browser-powered/client-side

- Requires: test browser, no real victim, HTTP/1.1 path, approved browser PoC.
- Evidence: endpoint early response, browser connection reuse condition, benign gadget.
- Abort: HTTP/2 is used by browser, request affects third-party, stateful action cannot be rolled back.

## Contract E - Protocol transition

- Requires: owned proxy/client context or lab first.
- Evidence: rejected Upgrade/CONNECT/h2c/opportunistic TLS transition, optimistic bytes, HTTP/1.1 interpretation after rejection.
- Abort: untrusted third-party TCP payload, unknown proxy auth scope, no close-on-reject evidence.


## Contract F - New-parser theme review

- Requires: named theme such as TE.0, chunked parser differential, TRACE-assisted gadget, h2c, HTTP/3 contamination, or RFC 2817/opportunistic TLS.
- Evidence: root boundary, same/fresh connection controls where relevant, canonical protocol controls, and one clear benign explanation ruled out.
- Abort: broad parser fuzzing, out-of-scope sibling authority, sensitive reflection, or unclear tunnel ownership.
