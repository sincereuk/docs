## How it works

Pipelines are triggered by [Workflows](/learn/workflows/introduction.html), and
Workflows are in turn triggered by Hooks. Every pipeline results in an
**artifact**, which is stored internally so that it can be used when the
following pipeline is triggered. The next pipeline can use this artifact as
input only when the Workflow that is triggering this pipeline has a
**Workflow**-type hook. Read more about Hooks in the [Workflows section](/learn/workflows/introduction.html).

![image](/images/pipeline-build.svg)

When a  pipeline starts it uses the *box* section in your
[wercker.yml](/learn/basics/configuration.html) file as a base container and
pulls it in from the [Docker Hub](http://dockerhub.com), after which the
[steps](/learn/steps/introduction.html) as defined in your `wercker.yml` are
executed.

Any [service](/learn/containers/services.html) container that was also
specified will be spun up as a *separate container* and be available
during the build pipeline. Communication with service containers is done
through [environment variables](/learn/containers/using-containers.html).

![image](/images/pipeline-service.svg)

Within pipelines, [environment variables](/learn/basics/configuration.html)
can be used for tokens, passwords and other configuration information that
might be needed during the lifetime and execution of a pipeline.

- - -
> You can also specify containers on a per-pipeline-basis. Read more on the docs
> [docs](/docs/pipelines/per-pipeline-containers.html)

[&lsaquo; Introduction to pipelines ](/learn/pipelines/introduction.html "nav previous pipelines")
[Available Pipelines &rsaquo;](/learn/pipelines/available-pipelines.html "nav next pipelines")
