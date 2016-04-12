## Using wercker cache

A cache directory is shared between [chained
Workflows](/docs/workflows/index.html). The path to this directory is stored in
the environment variable `$WERCKER_CACHE_DIR`. A step can leverage this cache
to share assets between builds.

### Dependency installers
Out of the box we've enabled caching by default for three dependency
installers:

* [npm-install](https://app.wercker.com/#applications/51c829f23179be44780021ac/tab/details)
* [bundle-install](https://app.wercker.com/#applications/51c829d13179be44780020be/tab/details)
* [pip-install](https://app.wercker.com/#applications/51c829fb3179be44780021f0/tab/details) combined with [virtualenv](https://app.wercker.com/#applications/527bb985138f8aef26000c8f/tab/details)

These steps leverage the cache to shorten the installation time of
dependencies.  This works by storing the end-result of the downloading and
compiling of dependent packages.

Future pipeline executions can use this as a starting point and only new dependencies which
were not cached are downloaded. At the start of every pipeline run the cache directory
is filled with the cached content from the last successful build, if not older
than 14 days (and is < 1GB).

> Note: A step should not depend on content of the cache and should be able to handle
scenarios where the cache is not populated.

Here is a simple example of a custom step that leverages the cache:

```bash
if [ -f "$WERCKER_CACHE_DIR/mystep/a-dependency.bin" ]; then
    debug "a-dependency.bin found in cache"
else
    debug "a-dependency.bin not found in cache, will download"
    curl -o "$WERCKER_CACHE_DIR/mystep/a-dependency.bin" "http://example.com/a-dependency.bin"
fi
```

This example checks for the file `$WERCKER_CACHE_DIR/mystep/a-dependency.bin`
from the cache. If the file is not found, it will be downloaded to the cache
directory so it will be available for future pipeline runs, if the run succeeds.
