## Building Projects Locally

Using the wercker CLI you can build projects locally on your machine.

```no-highlight
wercker build
```

### Mounting your working directory

You can mount your local project folder directly to the container's
pipeline path by running:

```no-highlight
wercker build --direct-mount
```

### Committing containers locally

By default running `wercker build` will not save the container. In order
to save the container you must commit it first:

```no-highlight
wercker build --commit <image_name>
```

### internal/docker-push

The container will *only* be committed to the the Docker host after which you can run
it. Alternatively, if using the
[internal/docker-push](/docs/steps/internal-steps.html#docker-push) together
with the [docker-local](/cli/configuration/options-and-flags.html#docker-local) flag, the build container
will also be committed to the local host.

### flags

To see how to customize your builds with flags and environment variables,
please check out the [configuration section](/cli/configuration/index.html).
