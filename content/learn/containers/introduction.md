## Introduction to containers

Software containerization is a way to isolate your applications and
services from the rest of the operating system (or other containers).
Not only are containers an isolated unit of work, they're also portable.


### Docker

Wercker's usage of [Docker](http://docker.com) is twofold. First of all,
Wercker executes your [pipelines](/learn/pipelines/introduction.html) inside
containers, providing you with an isolated runtime environment to run your
tests in. 

Secondly, every Wercker pipeline produces an artifact, and that result can be
packaged as a container and pushed to a registry seamlessly.

This means that you can build, ship and deploy these containers to your servers
all from within Wercker.

![image](/images/portable-container.svg)

Within pipelines, containers are used to run your language stack (for instance
python) but also services such as a database.

In the next couple of sections we will explain where to get your containers
from, and how to use them.

[Using Containers &rsaquo;](/learn/containers/using-containers.html "nav next containers")
