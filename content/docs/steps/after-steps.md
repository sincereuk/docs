---
tags: steps, after-steps, notifications, after
---

## After steps

Pipelines executions can contain `after-steps`. Steps that are
executed after a pipeline run has either failed or passed. A good use-case
for `after-steps` are notifications to an [IRC channel](https://app.wercker.com/#applications/51f2a14ddf5a46247c000cf7/tab/details)
or [HipChat Room](https://app.wercker.com/#applications/51f26c380771b3526e000c1c/tab/details),
closing an issue on a project management system or sending out a newsletter after a successful deploy.

Here's an example that leverages the
[hipchat-notify](https://app.wercker.com/#applications/51f26c380771b3526e000c1c/tab/details)
step to send a notification. Note the use of the `after-steps` element to
signify that the message has to be sent after the steps of the deploy.

```yaml
deploy:
    steps:
        - script:
            name: fabric deploy
            code: |
              fab deploy
    after-steps:
        - hipchat-notify:
            token: $HIPCHAT_TOKEN
            room_id: id
            from-name: name
```

One major difference between steps and after steps is that failing after-steps
do not change the result of the pipeline run.
