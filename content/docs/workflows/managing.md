## Managing Workflows

### Hooks

Hooks define how pipelines get triggered. By default, pipelines will listen for other pipelines to finish.
Alternatively, you can assign a Git hook to the pipeline to make it trigger on Git changes.

#### Git Hooks

Git hooks work just as your average **build** pipeline. When a change is
detected for a Git source, Wercker will trigger the pipeline that is
attached to it. Git hooks allow you to specify which branches should be
**ignored** in the **Hooks** section of your Workflow.

#### Pipeline Hooks (default)

The default hook enables you to start a new pipeline based on the result
of a previous pipeline execution.
This allows you to [chain pipelines](/docs/workflows/chaining.html) together.

### Creating Workflows

Workflows can only be created on the website (different from
[pipelines](/docs/pipelines/index.html), which can only be defined in the
[wercker.yml](/docs/wercker-yml/index.html)).

To create a new Workflow, you can use the **Manage Workflows** button found in the
top right of your application page. Alternatively, you can go to your
application **settings** page and head to the **Workflows** section.

Workflows can be created by chaining pipelines together. To do that, you must first specify these pipelines on the website.
You can read how to do that [here](/docs/pipelines/managing.html).

