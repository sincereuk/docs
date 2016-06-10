---
tags: containers
---

## Pushing Docker containers

Though you are unable to run `docker` commands in your pipelines as this
would require being able to be [outside](/docs/faq/can-i-run-docker-commands.html) the container, we have created
several [internal](/docs/steps/internal-steps.html) [steps](/docs/steps/index.html) in order to interact with docker.

> Note the `internal/docker-push` step only works with registries that
comply with the Docker Registry API.

[Internal steps](/docs/steps/internal-steps.html) are steps that are baked into the
wercker [cli](/cli/usage/index.html) as these interact with
the Docker API that is external from the container. From a security perspective
we don't want to make this functionality
available from inside the Docker container, and as such have created these *internal* steps.

In order to push to Docker registries you can use the either the `internal/docker-push` or the
`internal/docker-scratch-push` step. The difference between the steps is that docker-push step
pushes the current container and the docker-scratch-push uses a [baseimage](https://docs.docker.com/articles/baseimages/). For more details on
the `internal/docker-scratch-push` step see [Internal steps](/docs/steps/internal-steps.html).

The following examples show how to push to Docker registries such as the
[Docker Hub](https://registry.hub.docker.com/) and [Quay.io](http://quay.io) that adhere to
the `docker` API.

> When pushing to both public and private registries make sure you've
created the repository first

You can push to the following registries:

* [Docker Hub](#hub)
* [Quay.io](#quay)
* [Google Container Registry](#gcr)


### <a name="hub" class="anchor"></a> Pushing to the public Docker Hub

```yaml
deploy:
  steps:
    - internal/docker-push:
        username: $USERNAME
        password: $PASSWORD
        tag: my-amazing-tag
        repository: turing/bar
        registry: https://registry.hub.docker.com
```

The `$USERNAME` and `$PASSWORD` fields are environment variables that
you should specify through the [wercker web interface](/docs/environment-variables/index.html). The `repo`
field contains the repository that you want to push to (in this case the
username `turing` with the `bar` image), and `registry` is
the URL of your Docker registry.

>NOTE: if you want to push to a registry that supports V2 of the API, simply append "/v2" to your registry URL.

If your container needs a `cmd` to be run on start up of the container along
with a `port` that your application listens on, you can "bake" that into
the container as well:

```yaml
deploy:
  steps:
    - internal/docker-push:
        username: $USERNAME
        password: $PASSWORD
        tag: my-amazing-tag
        cmd: my-amazing-command
        ports: "5000"
        repository: turing/bar
        registry: https://registry.hub.docker.com
```

Same goes for an `entrypoint` directive:

```yaml
deploy:
  steps:
    - internal/docker-push:
        username: $USERNAME
        password: $PASSWORD
        tag: my-amazing-tag
        entrypoint: my-entrypoint
        repository: turing/bar
        registry: https://registry.hub.docker.com
```

> If you're pushing to the Docker Hub, the registry field is optional and can be omitted.

### <a name="quay" class="anchor"></a> Pushing to quay.io

If you want to push to a different (private) registry such as [quay.io](http://quay.io) you
would create the following [wercker.yml](/docs/wercker-yml/creating-a-yml.html) file:

```yaml
deploy:
  steps:
    - internal/docker-push:
        username: $USERNAME
        password: $PASSWORD
        tag: my-amazing-tag
        repository: quay.io/knuth/foo
        registry: https://quay.io
```

Again `$USERNAME` and `$PASSWORD` are pipeline environment variables.
For the repository field, you prefix it with the domain name of your registry
when not using the Docker Hub. Here we push to the repo with username
`knuth` and the image `foo`.

### <a name="gcr" class="anchor"></a> Pushing to the Google Container Registry (gcr.io)

When pushing to the Google Container Registry (also known as
[gcr.io](http://gcr.io)) you need authenticate by using a [JSON key file](https://cloud.google.com/container-registry/docs/advanced-authentication#using_a_json_key_file) associated with a [service account](https://support.google.com/cloud/answer/6158849#serviceaccounts). 

Note that the username must be set to `_json_key`, otherwise the authentication will fail. You can store the contents of the JSON file in an environment variable called `$GCR_JSON_KEY_FILE`. 

```yaml
deploy:
    - internal/docker-push:
        username: _json_key
        password: $GCR_JSON_KEY_FILE
        repository: gcr.io/<MY-PROJECT-ID>/<MY-IMAGE>
        registry: https://gcr.io
```

### <a name="ecr" class="anchor"></a> Pushing to Amazon ECR

Pushing to ECR requires some extra paramaters for it to work. 

```yaml
box: busybox
push-to-ecr:
  steps:
    - internal/docker-push:
        aws-access-key: $AWS_ACCESS_KEY_ID
        aws-secret-key: $AWS_SECRET_ACCESS_KEY
        aws-region: $AWS_REGION
        aws-registry-id: $AWS_REGISTRY_ID
        repository: your_repo_name
```

> Note, if no tag is specified, the tag will be set to the branch name.
