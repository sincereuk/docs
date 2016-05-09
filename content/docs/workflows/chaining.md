## Chaining pipelines

A major benefit introduced by Workflows is that you can now chain as many
pipelines as you want, instead of just **build** -> **deploy**.

Chaining pipelines can be done up to 10 times to create the powerful, custom
Workflow that you need.

In the screenshot below you can see three pipelines chained together.

![image](/images/workflow-editor.png)

First, we build our base-image, via the **inital-build** pipeline.
Inspecting the **intial-build** pipeline you can see it gets triggered based on a `git push`.

![image](/images/create-pipeline.png)

Next, we run our unit test through the **tests** pipeline. This pipeline is
triggered automatically after the **initial-build** pipeline has successfully finished.
The screenshot below showcases how this pipeline is chained.

![image](/images/chaining.png)

The **tests** pipeline is triggered on any passing **build** on *any* branch.

The last few pipelines push our images (one debug, one production-ready) to a registry.
