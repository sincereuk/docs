---
tags: environment variables, services, dockerlinks
---

## Linking services 

Wercker uses [dockerlinks](https://docs.docker.com/userguide/dockerlinks
/#environment-variables) to enable interaction between containers.
Every service that is specified in your **wercker.yml** will be linked to the
main box, where your application lives.

### Exposed environment variables
Dockerlinks work by exposing the **service container’s** environment variables
to the **current environment**. This happens for every service listed in the
`services:` section. For each service, Docker will expose **three** distinct
environment variables (where the container name is the name of the
service container):

```no-highlight
<container name>_PORT_<port>_<protocol>_ADDR
<container name>_PORT_<port>_<protocol>_PORT
<container name>_PORT_<port>_<protocol>_PROTO

// any other env vars exposed from within the container 
// will be exposed in this format
<name>_ENV_<env>
```

For example, if you want to use the [default
ElasticSearch](https://registry.hub.docker.com/_/elasticsearch/) as a service
in your application, the following env variables would be injected:

```no-highlight
ELASTICSEARCH_PORT_9200_TCP_PORT
ELASTICSEARCH_ENV_JAVA_DEBIAN_VERSION
ELASTICSEARCH_NAME
ELASTICSEARCH_PORT_9200_TCP_PROTO
ELASTICSEARCH_PORT_9300_TCP_PORT
ELASTICSEARCH_PORT_9300_TCP_ADDR
ELASTICSEARCH_ENV_CA_CERTIFICATES_JAVA_VERSION
ELASTICSEARCH_ENV_ELASTICSEARCH_VERSION
ELASTICSEARCH_ENV_JAVA_VERSION
ELASTICSEARCH_PORT
ELASTICSEARCH_PORT_9200_TCP
ELASTICSEARCH_PORT_9300_TCP
ELASTICSEARCH_PORT_9300_TCP_PROTO
ELASTICSEARCH_PORT_9200_TCP_ADDR
```

### Getting the environment variables
If you want to view which variables are exposed in your container while it's
running, you can run the [env](http://man.cx/env) command in a `script` step in
your `wercker.yml` file:

```yaml
# wercker.yml
box: tcnksm/gox:1.3.3
services:
   - elasticsearch
build:
   steps:
     - script:
         name: env
         code: env
(...)
```

### Using the environment variables

To use these env vars in your application you
would simply query the environment for the variables you are looking for. In
this example, you would want the IP and the port Elasticsearch is running on. In
Go this would look something like this:

```golang
fmt.Println(“IP:", os.Getenv("ELASTICSEARCH_PORT_9300_TCP_ADDR”))
fmt.Println(“PORT:", os.Getenv("ELASTICSEARCH_PORT_9300_TCP_PORT”))
```

### Waiting for services to come up

You can add this `script` step to your **wercker.yml** to ensure that your pipeline run will wait until the service has come up:

```
- script: 
name: "Wait for MariaDB connection" 
code: | 
while ! nc -q 1 $MARIADB_PORT_3306_TCP_ADDR $MARIADB_PORT_3306_TCP_PORT 
</dev/null; do sleep 3; done
```

Thanks to user [ryanrapp](https://github.com/ryanrapp/) for suggesting this!

### Advanced usage
You can read more about injecting environment variables and advanced service
usage in this [section](/docs/services/advanced-services.html)
