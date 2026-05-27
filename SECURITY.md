# Security Policy

This repository contains defensive security skills for authorized assessment,
triage, review, and reporting.

## Responsible Use

- Use these skills only on systems where you have explicit authorization.
- Do not use them to target third-party systems, real users, or shared production
  resources without written scope and isolation.
- Treat active exploitation, malformed protocol probes, cache poisoning, queue
  poisoning, callbacks, timing stress, and sensitive data access as manual-gated
  activities.
- Store metadata, hashes, and response shapes instead of private bodies, cookies,
  credentials, tokens, or tenant data.

## Reporting Issues

For issues in the skill content, open a normal repository issue when it is safe
to disclose publicly.

For sensitive misuse, harmful automation, or private vulnerability details, do
not include secrets or target data in the report. Share only the minimum context
needed to reproduce the documentation or validation problem.
