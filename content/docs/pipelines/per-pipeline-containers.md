---
tags: pipelines, containers
---

## Per-Pipeline Containers

Sometimes you need a different language stack or container for your deploy than
from your build.  In wercker it's possible to specify containers on a
per-pipeline basis.

To do so, you specify your [wercker.yml](/docs/wercker-yml/creating-a-yml.html)
as follows:

```yaml
box: busybox

# this pipeline will use busybox
build-base:
  steps:
    - script:
      name: echo environment
      code: env
build:
  # override busybox
  box: google/golang
  steps:
    - script:
        name: testing build
        code: go version
deploy:
  # override busybox
  box: nodesource/node:trusty
  steps:
    - script:
        name: testing deploy
        code: node --version
```

This will use the `google/golang` box in the build section and the
`nodesource/node` box with the `trusty` tag in the deploy section.
