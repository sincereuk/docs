## Introduction to Workflows

Workflows provide an abstraction on top of the traditional “build” and “deploy”
pipelines and are a fundemental aspect of Wercker. With Workflows you can
create **any type of pipeline** and more importantly, **chain pipelines together**.
This allows you to build modern, complex, containerized applications in a
highly automatable fashion.

![image](/images/workflows-content.svg)

Moving away from traditional builds & deploys is neccessary because modern
cloud-native applications consist of multiple moving pieces - **microservices** -
that often need to built & tested together. Splitting up your build and deploy
pipelines give you the possibility to combat that complexity.

### Using Workflows

While [pipelines](/learn/pipelines/introduction.html) allow you to define how
your applications get **built & deployed**, with **Workflows** you define
how those pipelines **should be managed**.  For example, having multiple
pipelines react to each other, or even running in parallel, is something you
define on a Workflow level. 

### Using Workflows: defining hooks

Workflows are defined by two key components: **hooks** and **pipelines**.

Hooks define what starts your Workflow. There are two type of hooks:
**Git** and **Workflow**.

**Git**-type hooks listen on your Git source and when a change is detected, it
will trigger the pipeline attached to that Workflow.

![image](/images/docs-intro.svg)

**Workflow**-type hooks listen for **other** Workflows to successfully execute
a pipeline. The artifact that the pipeline outputs upon completion is then
transferred to the next Workflow.

For example, a common use-case is to have a Workflow called **Build** which
builds your app with a Git-type hook, and a Workflow **Deploy**, which deploys
your application once **Build** successfully completes (and has a Workflow-type
hook).

### Using Workflows: executing pipelines

After defining them in the **wercker.yml**, pipelines can be executed by
passing the pipeline-name to the Workflow. Of course, it's possible to have
multiple Workflows executing the same pipeline, giving you the possibility to
execute a pipeline based on different conditions.

![image](/images/workflows-example.svg)

### In summary

To summarize, **Workflows** allow you to **manage pipelines**. Workflows are
triggered by **hooks**, which can be of type **Git** or **Workflow**.
Workflows can be run in **parallel** and can be **chained together**. Workflows
give you the tools to create complex, automated developer flows to build and
deploy your container-based applications.

[Pipelines &rsaquo;](/learn/pipelines/introduction.html "nav next pipelines")
