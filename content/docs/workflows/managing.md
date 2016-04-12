## Managing Workflows

### Hooks

Workflow hooks are what defines how Workflows get started. Currently there are
two types of hooks: **Git** and **Workflow**.

#### Git Hooks

Git hooks work just as your average **build** pipeline. When a change is
detected for a Git source, the Workflow will trigger the pipeline that is
attached to it. Git hooks allow you to specify which branches should be
**ignored** in the **Hooks** section of your Workflow.

You can have have multiple Workflows listening on the same Git source by simply
creating a new Workflow with a Git hook.

#### Pipeline Hooks

Adding a Workflow Hook enables you to start a new Workflow based on the result
of a previous pipeline execution. 
This allows you to [chain pipelines](/docs/workflows/chaining.html) together.

### Creating Workflows

Workflows can only be created in the UI (different from
[pipelines](/docs/pipelines/index.html), which can only be defined in the
[wercker.yml](/docs/wercker-yml/index.html)). 

To create a new Workflow, you can use the green "Workflow" button found in the
top right of your application page. Alternatively, you can go to your
application **settings** page and head to the **Workflows** section. 

To create a workflow you must:

1. Give it a name e.g.: “**deploy-to-dockerhub**”;
2. Decide how this workflow gets executed; This can be a Git or another Workflow hook;
3. Specify which pipeline you would like to execute; the pipeline-name
corresponds to the pipeline-name as you defined it in your wercker.yml;

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

#### Updating Hooks

You can reset which Hook type your Workflow listens on, but keep in mind that
this will completely remove any Hook-specific settings you might have.

For Workflow-based hooks you can specify any amount of Workflows that this
Workflow should listen on. For Git-based hooks you can specify on which branch
this Workflow should start.

Finally each target can have one of the following permission requirements:

1. Public
2. View runs
3. View Runs + Manage Workflows
4. Admin

**Public**:  If both your application and Workflow are set to **public** everyone will be able to see the runs executed for that Workflow. If your application is not public, all your collaborators (regardless of their permissions) will be able to see runs executed for that Workflow.

**View runs:** Allow only collaborators with ‘view runs’ permissions to manage this target

**View Runs + Manage workflows**: Allow only collaborators with ‘View runs + Manage workflows’ to manage this target

**Admin**: Only administrator collaborators can manage this Workflow


### Deleting Workflows

Deleting a Workflow can be done by navigating to that Workflow and hitting the
**Delete Workflow** at the bottom of the page. Deleting a Workflow does not
influence your existing **pipelines** in any way but might break your Workflow
chain.


