## Managing pipelines

This section describes how pipelines can be defined and updated on the hosted Wercker platform.

### Creating pipelines

To create a new pipeline so that it can be used in [Workflows](/docs/workflows/index.html) you must:

1. Give it a name e.g.: “**deploy-to-dockerhub**”;
2. Decide how this pipeline gets executed; This can be a Git source or another pipeline (default);
3. Specify which pipeline you would like to execute; the pipeline-name
corresponds to the pipeline-name as you defined it in your wercker.yml;

![image](/images/create-pipeline.png)

Note that, when creating an application on the Wercker platform, a `build`
pipeline, which contains a Git hook and executes a pipeline called `build`,
will be automatically created.

### Updating pipelines

![image](/images/pipelines-ui.png)

An overview of all your pipelines is available in your **application settings**
-> **Workflows**. Selecting one pipeline allows you to edit its settings.

#### Updating environment variables

Each pipeline can have its own set of environment variables, including SSH
keys. You can read more about creating environment variables
[here](/docs/environment-variables/index.html).

#### Pipeline permissions

Each pipeline can have one of the following permission requirements:

1. Public
2. View runs
3. Execute & Manage pipelines
4. Admin

**Public**: If both your application and pipeline are set to **public** everyone will be able to see the runs executed for that pipeline. If your application is not public, all your collaborators (regardless of their permissions) will be able to see executions for that pipeline.

**View runs:** Allow only collaborators with ‘view runs’ permissions to manage this pipeline

**Execute & Manage pipelines**: Allow only collaborators with ‘View Execute & Manage workflows’ to manage this pipeline

**Admin**: Only administrator collaborators can manage this pipeline
