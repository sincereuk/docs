# quickstart

In this quickstart we will be creating an application in NodeJS and set
up the [Clair](https://github.com/coreos/clair) security scanner for our containers. We will be using
Wercker Workflows to split up our pipelines and use different base
images along the way.

The goal is to create both a *debug* container, as well as a *release* container, structuring our Workflow such that dependencies and base images are separated.

You can find the source code for this application [here](). This quickstart assumes you have forked this repository, have set up a new application on Wercker and have created a container repository on [quay]() for this application.

Our first pipeline called `initial-build` will create a base image on
top of the [iojs]() container by installing our dependencies. You can view the entire `wercker.yml` pipeline [here]().

This first pipeline in our our `wercker.yml` looks as follows:

```
box: iojs

initial-build:
  steps:
    - script:
        name: install-packages
        code: |
          apt-get update
          apt-get install -y bzip2

    - script:
        name: setup node env
        code: |
          export NODE_ENV=development

    - npm-install
```

Our second pipleine will run our unit tests to make sure our code is functioning properly, the image used for this pipeline is again `iojs`, the same from the `initial-build` pipeline.

```
tests:
  steps:
    - script:
        name: install-packages
        code: |
          apt-get update
          apt-get install -y libfreetype6 libfontconfig

    - script:
        name: setup node env
        code: |
          export NODE_ENV=development

    - script:
        name: run tests
        code: |
          npm test
```

After our `test` pipeline passes were are ready to push this debug container to [quay.io]() the container registry from [CoreOS]. Before doing so however, we want to activate the Clair security scanner to make sure there are now vulnerabilities in our container.

On the repository page on Quay, you should see a notification allowing you to set up "Automated Security Scanning" for your repository. Configure this using the notification type of your choice. For the alert level we will be picking *high* priority level with regards to the threat level.

We are now ready to set up our pipeline that will push our tested debug container to Quay. For this we will leverage the `internal/docker-push` step that is capable of pushing to various container registries.

```
push-debug:
  steps:
    - internal/docker-push:
        repository: quay.io/<USERNAME>/todo-demo-debug
        username: $DOCKER_USERNAME
        password: $DOCKER_PASSWORD
        registry: quay.io
        tag: $WERCKER_GIT_BRANCH
        working-dir: /pipeline/source
        cmd: npm start
```

In the above pipeline we have set up our repository name, our credentials and of course are using Quay.io as our registry. For the pushed tag we will use the git branch environment variable that is available in any Wercker pipeline, setting the tag to the built branch. We set the working directory to the `/pipeline/source` folder where the pipeline runs inside.
Finally, we set the command to run on launching the container to `npm start` which will execute the command specified in the `package.json` file.

We now have the three basic pipeline necessary to build, test and push our debug container to Quay.io. The missing piece is linking these pipeline together with Wercker Workflows. In Wercker, navigate to the settings page of your application and click on the Workflows section.

Let's commit and push our application. This will trigger
