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

Workflows can only be created in the UI (different from
[pipelines](/docs/pipelines/index.html), which can only be defined in the
[wercker.yml](/docs/wercker-yml/index.html)).

To create a new Workflow, you can use the "Manage Workflows" button found in the
top right of your application page. Alternatively, you can go to your
application **settings** page and head to the **Workflows** section.

Workflows can be created by chaining pipelines together. To do that, you must first specify these pipelines in the UI.
To create a pipeline, you must:

1. Give it a name e.g.: “**deploy-to-dockerhub**”;
2. Decide how this workflow gets executed; This can be a Git or another Workflow hook;
3. Specify which pipeline you would like to execute; the pipeline-name
corresponds to the pipeline-name as you defined it in your wercker.yml;

![image](/images/pipelines-ui.png)

Note that, when creating an application on the Wercker platform, a `build`
Worfklow, which contains a Git hook and executes a pipeline called `build`,
will be automatically created.

### Updating Workflows

An overview of all your Workflows is available in your **application settings**
-> **Workflows**. Selecting one Workflow allows you to edit its settings.

#### Updating environment variables

Each Workflow can have its own set of environment variables, including SSH
keys. You can read more about creating environment variables
[here](/docs/environment-variables/index.html).

#### Pipeline permissions

Each pipeline can have one of the following permission requirements:

1. Public
2. View runs
3. View Runs + Manage Workflows
4. Admin

**Public**:  If both your application and pipeline are set to **public** everyone will be able to see the runs executed for that pipeline. If your application is not public, all your collaborators (regardless of their permissions) will be able to see runs executed for that Workflow.

**View runs:** Allow only collaborators with ‘view runs’ permissions to manage this pipelien

**View Runs + Manage workflows**: Allow only collaborators with ‘View runs + Manage workflows’ to manage this pipeline

**Admin**: Only administrator collaborators can manage this pipeline


