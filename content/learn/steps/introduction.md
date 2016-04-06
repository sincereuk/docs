## Introduction to steps

Steps make up the wercker pipeline and are executed within the pipeline.

Examples steps that you could run in your build phase  are compilation of your code, running your
unit tests or even static code analysis such as `jshint` or `golint`.

Steps run in your deploy phase could be the synchronization of static assets, for
which we've created the [s3sync
step](https://github.com/wercker/step-s3sync/), that takes some Amazon
Web Services
credentials and bucket information and places these assets on Amazon S3.

Finally, there's the notion of [after-steps](/learn/steps/after-steps.html), which
can be used for notifications.

[Using steps &rsaquo;](/learn/steps/using-steps.html "nav next steps")
