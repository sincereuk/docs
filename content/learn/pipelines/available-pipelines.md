## Available pipelines

Pipelines are a core concept of wercker. They are triggered by Workflows, take
code or Wercker artifacts as input, execute a series of steps, and produce a
container. You can define any pipeline you want and name them however you want,
with one exception: the **dev** pipeline.

### <a name="dev" class="anchor"></a>Dev

The goal of the development pipeline is to allow you to develop your
application locally inside of containers, while wercker takes care of
automating your development environment. You can specify
[services](/learn/containers/services.html), that will run inside containers,
which you need to run your app. Services can be Databases, Messaging queues, or
even your own specific API that you have hosted on Dockerhub. 

Developing inside containers and letting wercker automate that process, is
extremely useful because it allows you to execute your applications as they
would run on production (in a container!). That means that you get real close
to dev/prod parity. 

---
The dev pipeline is unique in that it can only be used while using the wercker
CLI, and not on the hosted wercker platform.

In order to use the the development pipeline, incorporate the following in your
`wercker.yml` file.

```yaml
dev:
  steps:
    - npm-install
    - internal/watch:
        code: node app.js
        reload: true
```

- - -
> Want to learn more? Read more about developing locally in the
> [docs](/cli/usage/index.html)

There are also dedicated sections for topics such as
[pipelines](/learn/pipelines/introduction.html),
[containers](/learn/containers/introduction.html) and
[steps](/learn/steps/introduction.html).

[&lsaquo; How it Works](/learn/pipelines/how-it-works.html "nav previous pipelines")
[Steps &rsaquo;](/learn/steps/introduction.html "nav next steps")
