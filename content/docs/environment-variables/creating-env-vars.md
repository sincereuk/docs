## Creating environment variables

The interface supports two types of data, this article will show how to create
both a `text` and `SSH Key pair` environment variable.

* [Creating a text environment variable](#text-env-var)
* [Creating a SSH key pair environment variable](#ssh-env-var)

### <a name="text-env-var" class="anchor"></a>Creating a text environment variable

Creating a new environment variable is as simple as filling in a name, value and
hiting Save. The next pipeline run you will trigger now has the environment variable
available in its pipeline.


> Please not that the name has to start with a letter and after that the following
characters are supported: 'a-z', '0-9' and '_'

![image](/images/creating-env-vars_1.jpg)

#### How to use it

All environment variable that are available need to be used by adding a `$` character.
The `SLACK_URL` created in the image above can be used in your wercker.yml as `$SLACK_URL`.

Example how you to use a environment variable with our
[Slack notify step](https://app.wercker.com/#applications/54d4a6c742494161430000f5/tab/details).

```yaml
build:
    after-steps:
        - slack-notifier:
            url: $SLACK_URL
            channel: notifications
            username: myamazingbotname
```

#### Protected environment variable

`Text` environment variable have the option to be set to `protected`.
[Read more on protected env vars &rsaquo;](/docs/environment-variables/protected-variables.html)

### <a name="ssh-env-var" class="anchor"></a>Creating a SSH key pair environment variable

![image](/images/creating-env-vars_2.jpg)

Another common type of information used during deploys (but also during builds)
are `SSH key pairs`. Wercker can help you generate them for you and will only expose
the public part of the pair via the interface. During a pipeline run, the key pair
is exposed via two environment variables ending with: `_PRIVATE` and `_PUBLIC`.

To use the SSH key pairs in wercker, you have to do two things:

* Let Wercker generate a pair, [read more on creating a SSH key pair &rsaquo;](/docs/ssh-keys/generating-ssh-keys.html)
* Create a variable

Instead of `text`, choose the `SSH Key pair` option, and select the `SSH Key pair`
you just created.

When you create a new variable for the `SSH key pair`, you will notice that you
are actually creating two environment variables that are based on the name you are entering.

For instance if you created an `SSH key pair` to use as a bitbucket deploy key,
you may want to name the variable `DEPLOY_KEY`. During the pipeline
run you will now have two environment variables: `$DEPLOY_KEY_PRIVATE`
and `$DEPLOY_KEY_PUBLIC`.


