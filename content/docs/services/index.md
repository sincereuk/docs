---
tags: services
---

## Using services

Services are separate containers in your pipelines that you need
alongside your *main* language stack container.

Service containers are *spun up separate* from the main container.
Examples of services are databases and queues. You specify service
containers in your [wercker.yml](/docs/wercker-yml/creating-a-yml.html) file through the `services` clause:

```no-highlight
services:
    - mongo
```

Having multiple services is also possible:

```no-highlight
services:
    - mongo
    - redis
```

Tags specify a version of your service container:

```no-highlight
services:
    - mongo:2.2.7
```

Please check the documentation of the container you are using if
additional environment variables need to be injected in the container or
not.

Note that as opposed to the [main containers](/learn/containers/using-containers.html) section, which is a singular item,
the services section contains a list of items and as such is preceded by a `-`.

Optionally you can provide each server with a unique name, which allows you to use multiple services with the same image:

```no-highlight
services:
  - name: red1
    id: sutoiku/redis
    cmd: redis-server
  - name: red2
    id: sutoiku/redis
    cmd: redis-server
```

This will override the Docker `name` which in turn is the hostname for that container. 

To understand how to connect to these services, please see [linking services](/docs/services/linking-services.html)
