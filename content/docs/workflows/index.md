## Workflows

*Workflows support the creation of complex, container-centric developer workflows.*

Workflows provide you with a mechanism to manage your [pipelines](/docs/pipelines/index.html).
With Workflows, you can create **any type of pipeline**, and more importantly **chain them
together**.

![image](/images/workflow-editor.png)

Read more about creating Workflows [here](/docs/workflows/managing.html).

### Example Workflows

#### Example #1: Build, push and release

Building and deploying a container is preferably done in multiple phases or
pipelines. The **first phase** can be to build and test your application with
all the dev dependencies included.

![image](/images/build-push-release.svg)

The **second phase** is pruning those dev dependencies and re-building for a
production environment. That can in turn be turned into a container and pushed
to a registry. The **last phase** can be triggered manually to deploy to
production, or automatically to a staging environment.

#### Example #2: Manage multi-environment complexity

Any good continuous deployment setup should include deployment to multiple
environments where the various aspects of your appliction can be tested.

![image](/images/multi-env.svg)

Managing deployments to all these different environments is something that
Workflows do very well. You can build different containers based on the same
Git source so that they can be deployed to the various environments that you
have set up, all in an automatic fashion.

#### Example #3: Checkpoint your pipelines

Sometimes there is a part of your pipeline that takes a significant amount of
time to finish.

![image](/images/checkpoint.svg)

Previously, when that part of the pipeline would fail, you would have to
restart the entire thing. With Workflows however, you can now split off that
part of the pipeline and put it in a new Workflow.  That way, if it fails, you
will be able to re-run just that pipeline which makes for much better build
times.

#### Example wercker.yml

An example of the **wercker.yml** building, pushing and releasing a Node-based
application.

```yaml
box: node:4-slim

initial-build:
  steps:
    - script:
        name: install-packages
        code: |
          apt-get update
          apt-get install -y bzip2

    - script:
        name: setup node env
        code: |
          export NODE_ENV=development

    - npm-install

release-build:
  steps:
    - script:
        name: setup node env
        code: |
          export NODE_ENV=development

    # Generate relevant artifacts
    - script:
        name: build release code
        code: |
          npm run build

push-release:
  # Override the node:4-slim box
  box:
    id: nginx:alpine
    cmd: /bin/sh

  steps:
    - script:
        name: cleanup build result
        code: |
          rm -rf *

    # push container as-is
    - internal/docker-push:
        disable-sync: true
        repository: quay.io/wercker/todo-demo-release
        username: $DOCKER_USERNAME
        password: $DOCKER_PASSWORD
        registry: quay.io
        tag: $WERCKER_GIT_BRANCH
```

