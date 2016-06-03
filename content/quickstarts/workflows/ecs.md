## Amazon ECR & ECS

In this tutorial, we’ll discuss how to continuously deploy your
containerized applications onto Amazon ECS and storing images in ECR. 
### Requirements

* A Wercker [account](https://app.wercker.com/users/new)
* The `workflows-ecs-ecr-demo` app, forked from [here](https://github.com/wercker/workflows-ecs-ecr-demo)
* A [running ECS + ECR cluster](https://console.aws.amazon.com/ecs/home#/firstRun)

### Application architecture

The demo application is a simple app that allows you to write todos. Since it
stores the todos in-memory, there is no database or backend storage neccessary.

### Configuring Wercker

Wercker’s configuration lives in one file: the **wercker.yml**. In the
**wercker.yml** we will specify several automation pipelines that define how
our application should be tested, built and then deployed. I've higlighted the
most important pipelines here:

```yaml
push-debug-ecr:
  steps:
    - internal/docker-push:
        aws-access-key: $AWS_ACCESS_KEY_ID
        aws-secret-key: $AWS_SECRET_ACCESS_KEY
        aws-region: us-east-1
        aws-registry-id: $AWS_REGISTRY_ID
        repository: workflows-demo
        tag: debug-$WERCKER_BRANCH_NAME

push-release-ecr:
  box:
    id: nginx:alpine
    cmd: /bin/sh
  steps:
    - script:
        name: mv static files
        code: |
          rm -rf /usr/share/nginx/html/*
          cp -Rp $WERCKER_SOURCE_DIR/* /usr/share/nginx/html
    - internal/docker-push:
        disable-sync: true
        aws-access-key: $AWS_ACCESS_KEY_ID
        aws-secret-key: $AWS_SECRET_ACCESS_KEY
        aws-region: us-east-1
        aws-registry-id: $AWS_REGISTRY_ID
        repository: workflows-demo
        tag: $WERCKER_GIT_BRANCH
        cmd: nginx -g 'daemon off;'

deploy-to-ecs:
  box: python:2.7-slim
  steps:
    - script:
        name: template
        code: ./template.sh
    - 1science/aws-ecs:
        key: $AWS_ACCESS_KEY_ID
        secret: $AWS_SECRET_ACCESS_KEY
        cluster-name: workflows-demo
        service-name: workflows-demo-service
        task-definition-name: workflows-demo
        task-definition-file: $WERCKER_SOURCE_DIR/workflows-demo-task-definition.json
```

Don’t worry if it seems like a lot, we’ll be going over every pipeline in the
next couple of sections. One thing to take note of, is the usage of
various environment variables.

#### Environment variables

If we want to use Wercker locally using the [CLI](http://wercker.com/cli),
we’ll need to define these env vars somewhere. By default, Wercker will look
for an ENVIRONMENT file, and if present, expose those env vars when executing
the pipelines. Alternatively, you can specify a custom file by using the`
--environment <your_file>` flag. You can copy/paste the following content into
that file, replacing the values with your own:

```no-highlight
X_AWS_ACCESS_KEY_ID=<access_key>
X_AWS_SECRET_ACCESS_KEY=<secret_access_key>

# only the unique id is neccessary
X_AWS_REGISTRY_ID=<id>

# the entire URL for your ECR instance
X_AWS_REGISTRY_URL=<url>

```

### Developing Locally

Now that we’ve configured Wercker to work locally, let’s start out by taking a
close look at the `dev` pipeline. We use this pipeline to develop our
application inside a container on our local machine. By spinning up our
applications, alongside its required services in containers, we achieve a
higher level of dev/prod parity.

```yaml
dev:
  steps:
    - script:
        name: setup node env
        code: |
          export NODE_ENV=development
    - npm-install

    - internal/watch:
        code: npm start
        reload: true
```

Our development pipeline is quite simple; we setup the correct `NODE_ENV`, run
`npm-install` and finally run the app itself using the `internal/watch` step,
which will re-run our application if it detects file changes.

To see the dev pipeline in action, execute the following command in your
terminal:

```no-highlight
wercker dev --publish 8000
```

Wercker will now execute the `dev` pipeline. You should see containers coming
up with the docker ps command, and once the server has successfully
loaded, you can go to `<your_docker_host_ip>:8000` and see our node app in
action:

```
--> Running step: watch
Finished in 12.37 seconds (files took 1 minute 33.09 seconds to load)
1 example, 0 failures

[2016-05-08 08:32:55] INFO  WEBrick 1.3.1
[2016-05-08 08:32:55] INFO  ruby 2.1.5 (2014-11-13) [x86_64-linux]
[2016-05-08 08:32:55] INFO  WEBrick::HTTPServer#start: pid=37 port=3000
```

![image](/images/todo-interface.png)

### Building the container

After setting up our local development environment we can now move on to
setting up the pipelines that will build our container images. Our Workflow
will look like this:

![image](/images/diagram-aws.svg)

#### Setting up testing

In the `tests` pipeline, we make sure that our application gets tested before we
start building our containers. This comes down to executing the `npm test` command.

Once the `tests` pipeline completes, we will setup Wercker in such a way that it
will trigger two pipelines simultaneously: `push-debug` and `release-build`.

#### Building a development image

At Wercker, we consider it a best-practice to split up your containers into a
debug container and a production-ready container. This `push-debug` pipeline
will create a development image and is relatively straightforward. Since
Wercker automatically makes the output of a previous pipeline available to the
next, we can simply push this container as-is to ECR. We can then use this
image to easily distribute the latest version of our application to team
members.

```yaml
push-debug-ecr:
  steps:
    - internal/docker-push:
        aws-access-key: $AWS_ACCESS_KEY_ID
        aws-secret-key: $AWS_SECRET_ACCESS_KEY
        aws-region: us-east-1
        aws-registry-id: $AWS_REGISTRY_ID
        repository: workflows-demo
        tag: debug-$WERCKER_BRANCH_NAME
```

#### Building a production-ready image

When building containers for production, it’s a good idea to make it as much of
a clean package as possible. That means getting rid of any dependencies and
other files we don’t need. It also means reconsidering which base image we’re
using and if we need a full-fledged OS (most of the times we don’t). So in our
`release-build` pipeline we run `npm rebuild`, and since we've not set the
`NODE_ENV` to `development` this time around, `npm` will only install the
dependencies needed for it to run in production. 

```yaml
release-build:
  steps:
    - script:
        name: npm rebuild
        code: |
          npm rebuild
    - script:
        name: build release code
        code: |
          npm run build
          mv ./build/* $WERCKER_OUTPUT_DIR
          mv template.sh $WERCKER_OUTPUT_DIR
```

Then we can push the artifact as an alpine nginx container, which dramatically
reduces our footprint. We also make sure to tag the image and specify which command
should be executed when running this container:

```yaml
push-release-ecr:
  box:
    id: nginx:alpine
    cmd: /bin/sh
  steps:
    - script:
        name: mv static files
        code: |
          rm -rf /usr/share/nginx/html/*
          cp -Rp $WERCKER_SOURCE_DIR/* /usr/share/nginx/html
    - internal/docker-push:
        disable-sync: true
        aws-access-key: $AWS_ACCESS_KEY_ID
        aws-secret-key: $AWS_SECRET_ACCESS_KEY
        aws-region: us-east-1
        aws-registry-id: $AWS_REGISTRY_ID
        repository: workflows-demo
        tag: $WERCKER_GIT_BRANCH
        cmd: nginx -g 'daemon off;'
```

### Deploying the result

#### Defining the deploy pipeline

Deploying an application to ECS involves creating a JSON file that
specifies how the application should run and which dependencies it might have.
To that end, we created the `workflows-demo-task-definition.json`. The
file should be relatively self-explanetory, so we won’t go into detail about it
here.

The `deploy-to-ecs` pipeline will use this file and then during the the
[deploy-to-ecs](https://app.wercker.com/#applications/55f8e29fee52f86b6d026f5a/tab/details/)
step, do an API call to let ECS know we have a new version of our application
available. Note that this pipeline uses a `python` box because the step was
written using `python`.

```
deploy-to-ecs:
  box: python:2.7-slim
  steps:
    - script:
        name: template
        code: ./template.sh
    - 1science/aws-ecs:
        key: $AWS_ACCESS_KEY_ID
        secret: $AWS_SECRET_ACCESS_KEY
        cluster-name: workflows-demo
        service-name: workflows-demo-service
        task-definition-name: workflows-demo
        task-definition-file: $WERCKER_SOURCE_DIR/workflows-demo-task-definition.json
```

#### Setting up hosted Wercker

Now that we’ve defined all our pipelines, we can chain them together
using [Workflows](http://wercker.com/workflows), which can be done through the
Wercker web interface. Go ahead and create a new project on Wercker using your
forked tweeter repository. Then, once your project is created, create a new
Workflow using the **Manage Workflows **button in the top right. There you can
add new pipelines, so go ahead and add all the pipelines as you defined in the
**wercker.yml**.

Once you've done that, we'll need to add three project-wide environment
variables (simply copy/paste the values from your ENVIRONMENT file you created
earlier):

```no-highlight
AWS_ACCESS_KEY_ID=<access_key>
AWS_SECRET_ACCESS_KEY=<secret_access_key>
AWS_REGISTRY_ID=<id>
```

![image](/images/ecs-pipelines.png)

#### Creating the Workflow

Now that we’ve defined all the pipelines and setup the environment variables,
we can start chaining pipelines! Navigate to the **Workflows **tab, and you should
see your `initial-build` pipeline in the Workflows editor, which represents the
starting point for our Workflow. Now you can add the remaining pipelines to
create the Workflow we want. The end result should look like this:

![image](/images/ecs_workflow_overview.png)

#### Preparing ECS for deployment

As a last step before we can deploy our application to ECS, we need to create a
cluster, a service and a task defintion file which describes how ECS should run
our containerized app. In this case, we called our cluster and task definition
file "**workflows-demo** and the service "**workflows-demo-service**" (as you
can see in the `deploy-to-ecs` pipeline).

### Wrapping up

That's it! You've now set up continuous deployment to Amazon's ECR & ECS. What
remains is to trigger the Workflow by pushing a change to your repostiory. You
should then see your Workflow kick in action.
