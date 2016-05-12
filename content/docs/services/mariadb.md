---
tags: mariadb, services
---

## MariaDB

MariaDB is a community maintained fork of MySQL. In this article we
will explain how to use this database with wercker.

### Setup

MariaDB has one specific [environment variable](/docs/services/advanced-services.html) that you need to set
in order run it. This environment variable is `MYSQL_ROOT_PASSWORD`.

You can set environment variables specific to a container using the
`env` parameter in your service definition.

See the [wercker.yml](/docs/wercker-yml/creating-a-yml.html) below for an example of setting up your MariaDB service.

```yaml
build:
  services:
    - id: mariadb
      # your credentials for Docker Hub
      username: $USERNAME
      password: $PASSWORD
      tag: latest
      # set the required environment variable
      env:
        MYSQL_ROOT_PASSWORD: mypassword

  # proceed with the build pipeline
  box:
    id: google/golang
  steps:
    # Build the project
    - script:
        name: go build
        code: |
            go build ./...
```

### Environment variables and Connection strings

Below you can find the environment variables that are created and made available.
You can use these for connection strings and such in your applications.

```no-highlight
MARIADB_ENV_MARIADB_VERSION=10.0.17+maria-1~wheezy
MARIADB_PORT=tcp://172.XX.X.XX:3306
MARIADB_PORT_3306_TCP=tcp://172.X.X.X:3306
MARIADB_PORT_3306_TCP_PORT=3306
MARIADB_ENV_MYSQL_ROOT_PASSWORD=mypassword
MARIADB_PORT_3306_TCP_PROTO=tcp
MARIADB_NAME=/wercker-pipeline-023ebb1f-5571-44d4-97ba-cb7b68e91274/mariadb
MARIADB_ENV_MARIADB_MAJOR=10.0
MARIADB_PORT_3306_TCP_ADDR=172.X.X.X
```

Read more about the MariaDB container on [Docker Hub](https://registry.hub.docker.com/_/mariadb/)

### Known issues

Please note that mysql and mariadb docker images have issues with starting the database in time, see https://github.com/docker-library/docs/tree/master/mysql#no-connections-until-mysql-init-completes. As a counter measure make sure to leave enough time, or implement a waiting mechanism to ensure the database is ready.
