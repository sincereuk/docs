--- tags: environmentvariables
---
## Available environment variables

There are a number of environment variables defined during pipeline execution.
They contain a variety of information, such as links to the current
application, the run, as well as the branch name and the location of your
application's unique cache.

### Git-type Workflow related variables

Let's take a look at a selection of them available during a build:

<table border="0">
<thead>
    <tr>
        <th>VARIABLE NAME</th>
        <th>EXAMPLE VALUE</th>
        <th>PURPOSE/CONTAINS</th>
    </tr>
</thead><tbody>
<tr>
    <td>WERCKER_MAIN_PIPELINE_STARTED</td>
    <td>1399372237</td>
    <td>Time in milliseconds when the build started</td>
</tr>
<tr>
    <td>CI</td>
    <td>true</td>
    <td>Can be used to detect if the app/script is running in an automated environment</td>
</tr>
<tr>
    <td>WERCKER_RUN_URL</td>
    <td>https://app.....178b</td>
    <td>Link to the build on wercker</td>
</tr>
<tr>
    <td>WERCKER_GIT_DOMAIN</td>
    <td>github.com</td>
    <td>The domain the repository is cloned from (i.e. bitbucket.org or github.com)</td>
</tr>
<tr>
    <td>WERCKER_GIT_OWNER</td>
    <td>wercker</td>
    <td>The owner of the repository</td>
</tr>
<tr>
    <td>WERCKER_GIT_REPOSITORY</td>
    <td>step-bundle-install</td>
    <td>The name of the repository</td>
</tr>
<tr>
    <td>WERCKER_GIT_BRANCH</td>
    <td>master</td>
    <td>The branch name</td>
</tr>
<tr>
    <td>WERCKER_GIT_COMMIT</td>
    <td>ef306b2479a7ecd433
        7875b4d954a4c8fc18
        e237</td>
    <td>The commit hash</td>
</tr>
<tr>
    <td>WERCKER_ROOT</td>
    <td>/pipeline/build</td>
    <td>The location of the cloned code</td>
</tr>
<tr>
    <td>WERCKER_SOURCE_DIR</td>
    <td>$WERCKER_ROOT/src</td>
    <td >The path to the directory of the source code. By default WERCKER_ROOT and WERCKER_SOURCE_DIR are the same. However you can change this location via the wercker.yml (to a subfolder in your repository)</td>
</tr>
<tr>
    <td>WERCKER_CACHE_DIR</td>
    <td>/cache</td>
    <td>The path to the cache directory. This directory will be stored after the pipeline completes and restored when the pipeline runs again</td>
</tr>
<tr>
    <td>WERCKER_OUTPUT_DIR</td>
    <td>/pipeline/output/</td>
    <td>Any files here are assumed to be the result of the build process. If this folder is empty, the WERCKER_ROOT is assumed to contain the build result</td>
</tr>
<tr>
    <td>WERCKER_STARTED_BY</td>
    <td>John Doe</td>
    <td>Run was started by this user</td>
</tr>
<tr>
    <td>WERCKER_APPLICATION_URL</td>
    <td>https://app......19ef</td>
    <td>URL of the application on wercker</td>
</tr>
</tbody>
</table>

When a step is executed, Wercker also creates additional environment variables
for you to use. Please see [the steps section](/learn/steps/introduction.html).
for more information.

### Workflow-type related variables

The following variables are available during Workflows with a Workflow-type
hook. As you can see it's more or less an expanded version of the information
available during a Git-type hook.

<table border="0">
<thead>
    <tr>
        <th>VARIABLE NAME</th>
        <th>EXAMPLE VALUE</th>
        <th>PURPOSE/CONTAINS</th>
    </tr>
</thead><tbody>
<tr>
    <td>WERCKER_MAIN_PIPELINE_STARTED</td>
    <td>1399372237</td>
    <td>Time in milliseconds when the deploy started</td>
</tr>
<tr>
    <td>DEPLOY</td>
    <td>true</td>
    <td>Shows whether </td>
</tr>
<tr>
    <td>WERCKER_DEPLOYTARGET_NAME</td>
    <td>staging</td>
    <td>Name of the deploy target the deploy is targeting</td>
</tr>
<tr>
    <td>WERCKER_RUN_URL</td>
    <td>https://app.....178b</td>
    <td>Link to the DEPLOY on wercker</td>
</tr>
<tr>
    <td>WERCKER_GIT_OWNER</td>
    <td>wercker</td>
    <td>The owner of the repository</td>
</tr>
<tr>
    <td>WERCKER_GIT_REPOSITORY</td>
    <td>step-bundle-install</td>
    <td>The name of the repository</td>
</tr>
<tr>
    <td>WERCKER_GIT_BRANCH</td>
    <td>master</td>
    <td>The branch name</td>
</tr>
<tr>
    <td>WERCKER_GIT_COMMIT</td>
    <td>ef306b2479a7ecd433
        7875b4d954a4c8fc18
        e237</td>
    <td>The commit hash</td>
</tr>
<tr>
    <td>WERCKER_ROOT</td>
    <td>/pipeline/source</td>
    <td>The location of the build result</td>
</tr>
<tr>
    <td>WERCKER_SOURCE_DIR</td>
    <td>/pipeline/source</td>
    <td >The path to the directory of the source code. By default WERCKER_ROOT and WERCKER_SOURCE_DIR are the same. However you can change this location via the wercker.yml (to a subfolder in your repository)</td>
</tr>
<tr>
    <td>WERCKER_CACHE_DIR</td>
    <td>/cache</td>
    <td>The path to the cache directory. This directory will be stored after the pipeline completes and restored when the pipeline runs again</td>
</tr>
<tr>
    <td>WERCKER_STARTED_BY</td>
    <td>John Doe</td>
    <td>Run was started by this user</td>
</tr>
<tr>
    <td>WERCKER_APPLICATION_URL</td>
    <td>https://app......19ef</td>
    <td>URL of the application on wercker</td>
</tr>
</tbody>
</table>
