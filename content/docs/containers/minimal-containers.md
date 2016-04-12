---
tags: containers
---

## Creating minimal containers

Many Docker containers in the wild are large in size. Often times this
is due to these containers being based on complete operating systems
that have a lot of cruft or dependencies installed that you don't need.

With wercker you can create the most minimal container, which is purely
based off the files in the `$WERCKER_OUTPUT_DIR` folder that you've
either collected or created during a pipeline execution.

### The internal/docker-scratch-push step

The `internal/docker-scratch/push` step 'bakes' a container with a
minimal file system, a port that you want to make available for your
application and the command that runs your app. It also pushes this
container to a Docker registry of choice.

You can find an example of a [wercker.yml](/docs/wercker-yml/index.html)
file that leverages the `internal/docker-scratch-push` step below:

```yaml
build:
    box: google/golang
    steps:

    # Statically build the project
    - script:
        name: go build
        code: CGO_ENABLED=0 go build -a -ldflags '-s' -installsuffix cgo -o app .

    # Create cities-controller.json for initialization
    - script:
        name: create cities-controller.json
        code: ./create_cities-controller.json.sh

    # Copy binary to location that gets passed along to deploy
    - script:
        name: copy binary
        code: cp app cities-service.json cities-controller.json "$WERCKER_OUTPUT_DIR"

deploy:
    box: google/golang
    steps:
    # use the scratch step to build a container from scratch based on the files present
    - internal/docker-scratch-push:
        username: $QUAY_USERNAME
        password: $QUAY_PASSWORD
        cmd: ./app
        tag: $WERCKER_GIT_COMMIT
        ports: "5000"
        repository: quay.io/wercker/wercker-kubernetes-quay
        registry: https://quay.io
```

The `google/golang` image is used as a base container for the build pipeline as
it has the golang language and build tools installed in it. The next
step is the compilation of the code which results in the executable of
the application.

As the final scratch image doesn't contain any dependencies or headers
the application might need, it is statically compiled.

The ability to create Go packages that call C code is disabled with the
`CGO_ENABLED=0` flag, rebuild all dependencies with the `-a` flag, and any
debug information is removed with the `-ldflags` flag, resulting in an even smaller binary.

The final executable is copied into the `$WERCKER_OUTPUT_DIR` making it
available to the next pipeline execution.

The deploy pipeline also uses the same `google/golang` box, but it is of
little interest for this deploy. Using the `internal-docker-scratch`
step a minimal file system is turned into a container. Using the `cmd`
and `ports` directive, the command to run on start up of the container
and the port on which the application is available are both baked into
the container respectively.

The final container is tagged with the `$WERCKER_GIT_COMMIT` for easy
reference and is *1.2MB* in size!

