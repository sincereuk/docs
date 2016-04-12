---
tags: services, docker
---

## Private services

Similar to private containers for your
[main boxes](/docs/containers/private-containers.html) wercker also
allows for private service containers.

Private services can either be pulled in from a private repository
on the [Docker Hub](/docs/containers/index.html) or from a
private registry such as [quay.io](http://quay.io).

By default wercker fetches private container from the Docker Hub.  Below a
service definition for your
[wercker.yml](/docs/wercker-yml/creating-a-yml.html) file that retrieves a
private container from the user `dijkstra` containing the repository
[rethinkdb](http://rethinkdb.org). The credentials for Docker Hub are passed
along as environment variables (`$USERNAME` and `$PASSWORD`) that are either
exported or defined in the [wercker web
interface](/docs/environment-variables/index.html).


```yaml
services:
    - id: dijkstra/rethinkdb
      username: $USERNAME
      password: $PASSWORD
      tag: latest
```


If you'd rather use a private registry, the following service definition
showcases how to fetch a container from [quay.io](http://quay.io).
The username in this case is `lamport` and the repository is `rabbitmq`.
Again the `$USERNAME/$PASSWORD` combo is passed along through environment variables
that you either have exported or defined in the
[wercker web interface](/docs/environment-variables/index.html).

```yaml
services:
    - id: quay.io/lamport/rabbitmq
      username: $USERNAME
      password: $PASSWORD
      tag: latest
      registry: quay.io
```

Note that the domain name for the private registry (in this case `quay.io`)
is defined before the `username/repo` combination when using a custom registry.
