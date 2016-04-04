---
tags: pipelines
---

## Pipelines

The pipeline is the heart and soul of Wercker, it's where you define the
actions (steps) and environment for your tasks, often your tests, builds and
deploys. They are an aggregate of steps and will
pass or fail based on the steps within.

Each pipeline also comes with an environment, some set by default by the
Wercker tool and, when run by wercker.com, others defined by the settings
you've entered on wercker.com.

[Steps](/docs/steps/index.html) are the actions performed within pipelines.

The configuration file and format for your pipelines is the
[wercker.yml](/docs/wercker-yml/index.html) file.

Every artifact from a build pipeline is both a Docker
[container](/docs/containers/index.html) as well as a `tarball` of the source code.
