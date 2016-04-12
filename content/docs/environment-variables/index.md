## Environment variables

What if you have an API key you need during a pipeline run? This is
information that is either unique for each server you want to deploy to or may
be too sensitive to store in the repository. Wercker supports a number of ways
to store and expose this data as environment variables.

### Global environment variables

There are variables which are `global`. Typically, these are used to store API
tokens for after-steps such as slack, hipchat, campfire etc. These variables
are called pipeline variables and can be set in the settings tab of your
application.

[Read more about creating env vars &rsaquo;](/docs/environment-variables/creating-env-vars.html)

### Workfow environment variables

The second set of variables are specific to
[workflows](/docs/workflows/index.html), and can only be set directly on the
Workflow. Typically, these are used to store information such as `hostnames`,
`ssh-keys`, `passwords` and more.  These variables are called `Workflow
variables`.

### Available environment variables

You can also use a [script step](/learn/steps/introduction.html) and use the `env`
command to see the full list of all variables at that moment during the pipeline execution.
This is convenient since there are reasons why the environment variables step does
not show all environment variables available during the pipeline run.

```yaml
- script:
    code: |
        env
```

[See the complete list of available env vars &rsaquo;](/docs/environment-variables/available-env-vars.html)
