## Chaining Workflows

A major benefit introduced By Workflows is that you can now chain as many
pipelines as you want, instead of just **build** -> **deploy**.

Chaining Workflows can be done up to 10 times to create the powerful, custom
Workflow that you need.

In the screenshot below you can see three Workflows chained together.

![image](/images/chaining.png)

First, we build our base-image, via the regular **build** workflow.
Inspecting the **build** workflow you can see it gets triggered based on a `git push`.

![image](/images/githook.png)

Next, we run our unit test through the **run-tests** Workflow. This Workflow is
triggered automatically after the **build** Workflow has successfully finished.
The screenshot below showcases how this Workflow is chained.

![image](/images/chainbuild.png)

The **run-tests** Workflow is triggered on any passing **build** on *any* branch.

Finally, we push our base image container to a registry using the **push-base** Workflow.
