## Getting started with wercker & Java
This guide is a step-by-step approach to developing, building and deploying a
sample app with wercker within minutes.

While this guide uses Java, the general concepts explained in this tutorial
apply to every other programming language.

### Requirements
To be able to follow along with this guide, you will need the following things:
* [A wercker account](https://app.wercker.com/users/new/)
* [The wercker CLI](http://wercker.com/cli/install)

### Setting up the app
Before we can start developing, we have to fork and clone the [sample
app](https://github.com/wercker/getting-started-java) into our local development
environment. After you've done that, `cd` into the project directory.

```
$ cd getting-started-java/
```

Next, build and run the app to verify everything is working.

```
$ ./gradlew bootRun
```

Now in your browser navigate to `127.0.0.1:8080` and you should be
presented with `Hello World`

### Developing the app
Now that we've setup our app we can start running it inside a container using wercker.
Before we do that however, let's first take a closer look at the **wercker.yml**
file included in your project folder.

### wercker.yml
The [wercker.yml](/docs/wercker-yml/index.html) is the only config file you
need for using wercker.  In it, you will define all your steps needed to
successfully **develop**, **build** and **deploy** your application.

To get started however, we're only interested in **developing** our app, so
let's take a closer look at this `dev` _pipeline_ right now.

#### Dev pipeline

```yaml
# docker box definition
box: java

# defining the dev pipeline
dev:
  steps:
    - script:
      name: gradle bootRun
      code: |
        ./gradlew bootRun
```

The first line specifies which container image you want to use for your
project.  Since we're developing with Java, we've already specified a Java
image for you.  These container images are retrieved from [Docker
Hub](https://hub.docker.com/r/library/golang/) if no other registry is
specified. You can read more about containers
[here](/docs/containers/index.html).

In the `dev` clause we define what we want to happen in our development
pipeline, which in this case is just one step: `script`.

the `script` step will run any arbitrary bash script we wish, in this case were going to use
this step to start our web application.

Let's see this step in action now and fire up our _dev pipeline_.

### wercker dev

In your project folder, run `wercker dev --publish 8080`. You should see
something similar to the following output:

```
--> Executing pipeline
--> Running step: setup environment
Pulling from library/java: latest
Download complete: fdd5d7827f33
Download complete: a3ed95caeb02
Download complete: 0f35d0fe50cc
Download complete: 7b40647e93b7
Download complete: 95109706d468
Download complete: 938141337517
Download complete: a3ed95caeb02
Download complete: 7ff1af1d8f09
Download complete: a3ed95caeb02
Download complete: a3ed95caeb02
Download complete: a3ed95caeb02
Download complete: a3ed95caeb02
Download complete: e8a4e33c1725
Download complete: ec40bd691d34
Status: Image is up to date for java:latest
--> Running step: wercker-init
--> Running step: run gradle
.
.
.
processResources
:classes
:findMainClass
:bootRun

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v1.3.3.RELEASE)
```

Wercker first checks out your code and then sets up the container environment.
This means that the container will be pulled from Docker Hub and subsequently
started with access to your checked out code. It will then start executing all the
steps that are defined in the **wercker.yml**.

If you navigate to DOCKER_HOST_IP:8080 you should see the same
output as before. The difference is that now your web application is running inside a docker container.

This is just the tip of the iceberg, there are [many more steps](https://app.wercker.com/#explore) to use for
developing your app.  Take a look around, and if you can't find the step you're
looking for, you can always [make your
own](/docs/steps/creating-steps.html).

Now that we're done developing and have tested our application locally,
we want to push our changes and let wercker build and deploy our app for us.

### Building your app
First, let's revisit our **wercker.yml** again.

```yaml
# docker box definition
box: java

# defining the dev pipeline
dev:
  steps:
    # A step that executes `gradle bootRun` command
    - script:
      name: run gradle
      code: |
        ./gradlew bootRun

# Build definition
build:
  # The steps that will be executed on build
  steps:
    # A step that executes `gradle build` command
    - script:
        name: run gradle
        code: |
          ./gradlew --full-stacktrace -q --project-cache-dir=$WERCKER_CACHE_DIR build

```

#### Build Pipeline
We're now interested in what's happening the _build_ pipeline. We've
added a new script step here, which will run our gradle build to compile our web application.
Take note that were also using the $WERCKER_CACHE_DIR environment variable to take full advantage of caching.

#### wercker build
Now that we have a better understanding of our **wercker.yml** let's go ahead
and let wercker **build** our project. In your project folder, run:

```
$ wercker build
--> Executing pipeline
--> Running step: setup environment
pulling from library/java: latest
Pulling dependent layers: ebd45caf377c
Download complete: 64e5325c0d9d
Download complete: bf84c1d84a8f
Download complete: 87de57de6955
Download complete: 6a974bea7c0d
Download complete: 3d0d66dec985
Download complete: ec367bd67c88
Download complete: 2d87eca0ec9c
Download complete: ac13965af848
Download complete: 14182e587f2c
Download complete: 37e56f6d02a4
Download complete: 1c18d4d04737
Download complete: 66bf953cd51b
Download complete: 0dfa22e2b56d
Download complete: ebd45caf377c
Download complete: ebd45caf377c
Status: Image is up to date for java:latest
--> Running step: wercker-init
--> Running step: gradle build
--> Steps passed: 37.35s
--> Pipeline finished: 38.35s
```

Success!

Building locally is very useful when you're not sure your code  will run
because of some changes you made. As such you don't want to push these
changes to your Git provider just yet.

But since we've verified that our app is compiling and running correctly, it's
time to let wercker build & deploy your app in the cloud, which is what we'll
be doing in the next section.

### Adding your app to wercker
The next step is to create a new application on wercker. Head over to
[https://app.wercker.com/](https://app.wercker.com/) and in the menu bar select
_create_ -> _application_.

#### Select your Git Provider
First select your Git provider, after which a list of your existing
repositories on either GitHub or BitBucket is presented. Select the ruby
example you forked earlier from the list and click on **Use selected repo**.

![image](/images/getting_started_select_repo_java.png)

#### Select the owner
Now we have to choose who owns the app. For this tutorial, go ahead and select
yourself. If you like, you can also select an organization you created on
wercker. Click on **Use selected owner** once you're ready.

#### Configure Access
The next step is about configuring access, and the first option - **checkout
the code without using an SSH key** - is fine for the purpose of this tutorial,
because it's an open source and public application. So go ahead and click
**Next step**

![image](/images/getting_started_configure_access.png)

#### Configuring the wercker.yml
At this point wercker will try to detect if you have a **wercker.yml** file in
your repository and if not, try to make one for you. However, we already have a
**wercker.yml** file so let's change that and click **I already have a
wercker.yml**. Be sure to leave the **Docker enabled** as it is.

#### Finishing up
Finally, once you've verified all the settings you can click **Finish** to
complete setting up our app!  When done, you will be redirected to your very
own app page, which looks empty now, so let's go ahead and change that.

### Triggering your first build

Wercker will automatically trigger a build every time you push new code to your
Git provider. Let's see that in action. In your working directory, run

```
$ git commit -am 'wercker build time!'
$ git push origin master
```

Next, navigate to your app page and you should see a new build has been
triggered! This build will do the exact same as the one you triggered locally
but now everyone in your team can see and comment on the build.

### Wrapping up
Congratulations! You've built your first app using wercker!
