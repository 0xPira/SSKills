# Technology and Vendor Matrix

### 5.1 AWS Application Load Balancer

- Superficies relevantes:
  - routing.http.desync_mitigation_mode
  - routing.http.drop_invalid_header_fields.enabled
  - routing.http2.enabled
  - X-Forwarded-For processing
- Evidence/configuration to collect:
  - monitor/defensive/strictest mode state
  - HTTP/2 enabled at client edge
  - target protocol and app server family
  - WAF fail-open attribute
- Pitfalls:
  - Do not treat ALB presence as vulnerable; validate mode and downstream parser.
- Specific mitigations:
  - Prefer strict desync mitigation, drop invalid headers, keep target parsers strict, log ELB classification.

### 5.2 Cloudflare Pingora

- Superficies relevantes:
  - Pingora cache/proxy deployments
  - HTTP/1.x ingress parsing
  - cache HIT request body handling
  - premature Upgrade/HTTP/1.0 TE classes
- Evidence/configuration to collect:
  - Pingora version
  - whether Pingora is ingress proxy
  - cache crate usage
  - HTTP/1 rejection behavior
- Pitfalls:
  - Cloudflare CDN traffic may not share standalone Pingora risk.
- Specific mitigations:
  - Upgrade Pingora, reject ambiguous framing, avoid close-delimited request bodies, isolate cache keys.

### 5.3 Akamai edge

- Superficies relevantes:
  - HTTP/2 request smuggling
  - browser-powered desync
  - Connection: Transfer-Encoding
  - OPTIONS + Expect + obs-fold
- Evidence/configuration to collect:
  - Akamai headers
  - HTTP/2/HTTP/1 path
  - edge-to-origin behavior
  - advisory date and patch state
- Pitfalls:
  - Do not generalize a fixed Akamai CVE to every Akamai property.
- Specific mitigations:
  - Rely on current Akamai mitigations, remove obs-fold, validate hop-by-hop processing, use support escalation for edge anomalies.

### 5.4 Fastly

- Superficies relevantes:
  - shielding
  - request collapsing
  - host header hidden problems
  - HTTP/2 downgrade discussion
- Evidence/configuration to collect:
  - X-Cache/Age/Fastly-FF
  - shield POP
  - origin override_host
  - PASS vs cache behavior
- Pitfalls:
  - Origin shield/cache behavior can look like queue anomalies.
- Specific mitigations:
  - Use override_host, avoid VCL Host mutation at edge POP, isolate cache tests.

### 5.5 Envoy

- Superficies relevantes:
  - allow_chunked_length
  - header validator
  - HTTP connection manager
  - trailers and codec behavior
- Evidence/configuration to collect:
  - HCM config
  - header validator config
  - runtime flags
  - upstream protocol options
- Pitfalls:
  - If allow_chunked_length is enabled, risk depends on multi-proxy chain.
- Specific mitigations:
  - Keep default rejection, enable header validator, avoid invalid HTTP messaging overrides.

### 5.6 HAProxy

- Superficies relevantes:
  - TE+CL close handling
  - duplicate Content-Length CVEs
  - empty Content-Length CVE
  - http-reuse
  - h1-case-adjust
- Evidence/configuration to collect:
  - HAProxy version
  - HTX mode
  - http-reuse policy
  - backend server strictness
- Pitfalls:
  - Header case adjustment is compatibility logic, not proof of desync alone.
- Specific mitigations:
  - Patch, reject duplicate/invalid CL, close on TE+CL, carefully scope aggressive reuse.

### 5.7 Apache httpd / mod_proxy

- Superficies relevantes:
  - mod_proxy_http body forwarding
  - proxy-sendcl
  - proxy-sendchunked
  - proxy-initial-not-pooled
  - CVE-2022-22720
  - CVE-2023-25690
  - HTTP/2 method injection
- Evidence/configuration to collect:
  - httpd version
  - mod_proxy config
  - RewriteRule/ProxyPassMatch substitution
  - HTTP/2 module
- Pitfalls:
  - mod_proxy config can create request splitting without classic CL.TE.
- Specific mitigations:
  - Patch, avoid unsafe rewrite substitution, close on discard errors, constrain proxying.

### 5.8 NGINX

- Superficies relevantes:
  - reverse proxy buffering
  - proxy_http_version
  - upstream keepalive
  - request processing by Host
- Evidence/configuration to collect:
  - proxy_request_buffering
  - proxy_http_version
  - upstream keepalive
  - server_name routing
- Pitfalls:
  - NGINX often rejects ambiguous framing; risk may be downstream app or custom module.
- Specific mitigations:
  - Buffer request bodies, normalize Host, keep strict parser defaults, avoid unsafe h1/h2 translation assumptions.

### 5.9 Varnish

- Superficies relevantes:
  - cache key
  - VCL request manipulation
  - backend fetch
  - request collapsing
- Evidence/configuration to collect:
  - VCL hash logic
  - beresp cacheability
  - Age/Via/X-Varnish
  - backend connection pooling
- Pitfalls:
  - Cache symptoms can be mistaken for response queue poisoning.
- Specific mitigations:
  - Keep VCL deterministic, normalize before hash, isolate poison tests to disposable keys.

### 5.10 Node.js / llhttp

- Superficies relevantes:
  - HTTP parser versions
  - headersTimeout
  - requestTimeout
  - joinDuplicateHeaders
  - insecureHTTPParser
- Evidence/configuration to collect:
  - Node version
  - insecureHTTPParser usage
  - proxy in front
  - duplicate header handling
- Pitfalls:
  - Framework behavior may differ from Node core parser.
- Specific mitigations:
  - Avoid insecureHTTPParser, patch Node, set strict limits, close on parser errors.

### 5.11 Go net/http

- Superficies relevantes:
  - strict server parser
  - ReverseProxy
  - http2 server
  - Header canonicalization
- Evidence/configuration to collect:
  - Go version
  - ReverseProxy Director/Rewrite
  - FlushInterval/streaming
  - http2 configuration
- Pitfalls:
  - Go app behind lenient proxy can still be vulnerable due to proxy boundary.
- Specific mitigations:
  - Patch Go, avoid custom raw TCP parsing, do not trust prior hop normalization.

### 5.12 Caddy

- Superficies relevantes:
  - reverse_proxy
  - HTTP/2/3 edge
  - upstream h1/h2
  - header manipulation
- Evidence/configuration to collect:
  - Caddy version
  - transport config
  - trusted_proxies
  - header_up/down
- Pitfalls:
  - Caddy strictness does not remove origin parser risk.
- Specific mitigations:
  - Keep modern versions, use strict upstreams, avoid arbitrary header_up Host rewrites.

### 5.13 IIS / Kestrel / ASP.NET

- Superficies relevantes:
  - request filtering
  - server limits
  - front-end reverse proxy
  - HTTP/2 support
- Evidence/configuration to collect:
  - IIS requestFiltering
  - Kestrel limits
  - ARR/proxy layer
  - host filtering
- Pitfalls:
  - IIS/Kestrel evidence must separate platform limit from app behavior.
- Specific mitigations:
  - Patch, enforce host filtering, align proxy and Kestrel limits.

### 5.14 Kubernetes ingress / Gateway API

- Superficies relevantes:
  - multiple proxy layers
  - ingress controller parser
  - service mesh sidecar
  - HTTPRoute rewriting
- Evidence/configuration to collect:
  - controller family
  - Envoy/NGINX/HAProxy/Traefik version
  - mesh mTLS
  - gateway filters
- Pitfalls:
  - Kubernetes alone is not a parser; the controller is the relevant parser.
- Specific mitigations:
  - Patch controllers, standardize protocol hops, remove unsafe rewrites.

### 5.15 Service mesh

- Superficies relevantes:
  - sidecar HTTP codec
  - mTLS tunnel
  - gateway to sidecar translation
  - header normalization
- Evidence/configuration to collect:
  - Envoy/Istio/Linkerd config
  - protocol sniffing
  - upgrade handling
  - HTTP/1 upstreams
- Pitfalls:
  - Mesh mTLS can hide but not fix HTTP/1 origin ambiguity.
- Specific mitigations:
  - Use end-to-end HTTP/2 where possible, strict header validation, align gateway/sidecar codecs.

### 5.16 API gateways

- Superficies relevantes:
  - request transformation
  - body parser
  - WAF plugins
  - path normalization
  - upstream protocol
- Evidence/configuration to collect:
  - Kong/Traefik/Apigee/plugin chain
  - request transformer config
  - body size limits
  - route matching
- Pitfalls:
  - A gateway 400 does not prove origin behavior.
- Specific mitigations:
  - Reject invalid framing at gateway, avoid transforming ambiguous requests, log normalized form.
