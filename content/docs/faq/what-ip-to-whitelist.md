---
tags: example
---

## What IP addresses does wercker use that you can whitelist

The IP addresses of our build machines will change over time. We will publish
the IP addresses of all stacks to the following two files:

- https://s3.amazonaws.com/status.wercker.com/worker_ips/production/public
- https://s3.amazonaws.com/status.wercker.com/worker_ips/production/public.json

The first link contains a simple newline delimited text file, and the second
contains a json file with a single array with all IP addresses.
