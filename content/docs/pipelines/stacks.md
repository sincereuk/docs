---
tags: pipeline, infrastructure, stack, docker
---

## Stacks

A stack is a complete environment that runs your pipelines, including the
operating system and container technology. Different stacks have different
feature sets.

You can change stacks by going to the infrastructure settings of your application.
There are currently *two* stacks available on wercker:

* Wercker Docker enabled (newest)
* Wercker classic (depracated) 

If you're already familiar with the _classic_ stack, see our [migration guide](/docs/faq/migration-tips-v2.html)
to move to the Docker stack.

### Docker Stack

The new wercker stack uses the [Docker](http://docker.io) container runtime.
Docker offers tools to create your own containers which you can publish on their
[Docker Hub](http://hub.docker.com). In the new wercker stack we allow you to use
containers obtained from the Docker Hub, which you can leverage in your pipelines.
As such, there is no longer a need to use the classic wercker marketplace of boxes.
Steps obtained from the marketplace work in *both* classic and new wercker.

You can read more about how wercker uses the Docker Hub in [this section](/docs/containers/index.html)

### Classic stack

Wercker classic uses LXC as its container runtime. Because developers want
different programming languages, build tools, libraries and services on their
environment, we offer the ability to create your own boxes and publish these
on the marketplace. However with Docker and other container formats gaining popularity
 and the ample choice of containers, Ewok is now the preferred stack.

In classic we also introduced the ability to customize
your pipelines via [steps](/docs/steps/index.html) and publish these
to the marketplace as well. Steps are still available in Ewok.
