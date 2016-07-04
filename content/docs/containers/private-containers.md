---
tags: docker
---

## Private containers

Private containers can either be pulled in from a private repository
on the [Docker Hub](/docs/containers/index.html) or from a
private registry such as [quay.io](http://quay.io).

Below you can find two examples of using a private Docker container as your
main container in your build pipeline.

### From Docker Hub

In order to pull in a private container you specify your repository via
the `id` parameter. Here we fetch the repository `python` belonging to the user `guido`.
You can provide a `$USERNAME` and `$PASSWORD` via environment
variables specified through the [wercker web interface](/docs/environment-variables/index.html).

```yaml
build:
    box:
      id: guido/python
      username: $USERNAME
      password: $PASSWORD
      tag: latest
    steps:
      - script:
        name: echo
```

The `registry` parameter is not necessary (see the next example) for
containers obtained from Docker Hub as it is the default registry that
we fetch from.

### From a private registry

In case you want to pull a container from a private registry you would
do that as follows.:

```yaml
build:
    box:
      id: quay.io/knuth/golang
      username: $USERNAME
      password: $PASSWORD
      tag: beta
      registry: quay.io
    steps:
      - script:
        name: echo
        code: echo "hello world!"
```

The username in this case is `knuth` and the repository is `golang`.
Again the `$USERNAME/$PASSWORD` combo is passed along through environment variables
that you either have exported or defined in the
[wercker web interface](/docs/environment-variables/index.html).

The domain name for the private registry (in this case `quay.io`)
is defined before the `username/repo` combination when using a custom registry.

Note that as opposed to the [services](/docs/services/index.html) section, which is a list of items,
the box section contains a singular item and as such is not preceded by a `-`.

### From Amazon ECR

Pulling private images from an Amazon ECR instance
requires a few more paramaters.

Below is an exapmle of pulling an image called `alpine`
from ECR using a set of environment variables.

Note that the `aws-registry-id` is the numerical value
that is provided by AWS once you crate an ECR instance.
E.g.: `694210xxxxxx`. 

```
box:
  id: alpine
  cmd: /bin/sh
  aws-access-key: $AWS_ACCESS_KEY_ID
  aws-secret-key: $AWS_SECRET_ACCESS_KEY
  aws-region: us-east-1
  aws-registry-id: $AWS_REGISTRY_ID
build:
	(...)
```

### From Google Container Registry (GCR)

When pulling a private image from the Google Container Registry (also known as gcr.io) you need authenticate by using a [JSON key file](https://cloud.google.com/container-registry/docs/advanced-authentication#using_a_json_key_file) associated with a [service account](https://support.google.com/cloud/answer/6158849#serviceaccounts).

Note that the username must be set to `_json_key`, otherwise the authentication will fail. You can store the contents of the JSON file in an environment variable called `$GCR_JSON_KEY_FILE`.

```
box:
    id: gcr.io/<MY-PROJECT-ID>/<MY-IMAGE>
        username: _json_key
        password: $GCR_JSON_KEY_FILE
        registry: https://gcr.io
        tag: <MY-IMAGE-TAG>
```
