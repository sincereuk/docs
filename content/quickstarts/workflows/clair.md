## CoreOS Clair Security Scanner

[Clair](http://github.com/coreos/clair) is an open source project for the static analysis of vulnerabilities in appc and Docker containers. It is currently integrated with [Quay](http://quay.io), the container registry from CoreOS, which makes it very easy to enable security scans and alerting. In this quickstart we'll show you how to setup a repository, and how to setup alerting.

Quay has enabled automatic scanning for each existing repository and any new repositories. This means that any new image that will be pushed to Quay will be scanned, and this will reported through the interface.

To enable alerting you need to goto the “Events and Notifications”, create a new alert. Here you need to select “Package Vulnerability Found” and the you can select the vulnerability level. Here you can select to either send a Quay notification, a e-mail notification, or a even a POST webhook.

![image](/images/clair-scanner.png)

Now that you've setup the Quay repository you can simply use the [internal/push step](http://devcenter.wercker.com/docs/containers/pushing-containers.html#quay) to push your images to Quay, and you should receive any alerts through your configured settings, if any vulnerabilities are found.

Once activated you will see alerts coming if for different tags.

![image](/images/danger.png)

One strategy for mitigating vulnerabilities is to leverage minimal containers.
