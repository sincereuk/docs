>Note: These endpoints only work if you have Workflows enabled!

## Runs

* [Get all runs](#get-all-runs)
* [Get a run](#get-a-run)
* [Get run steps](#get-run-steps)
* [Trigger a run](#trigger-a-run)
* [Abort a run](#abort-a-run)

### <a name="get-all-runs" class="anchor"></a> Get all runs

Get the last 20 runs for a given `pipeline` or `application`.


Returns an array of `run` objects.


***
`GET /api/v3/runs`
***

#### URL querystring paramaters

Either `applicationId` or `pipelineId` must be specified.

| Name | Type | Description |
|:-----|:-----|:------------|
| `applicationId` | String | **Optional** The id of the application. |
| `limit` | Integer | **Optional** Specify how many run objects should be returned. Max: **20**, default: **20** |
| `skip` | Integer | **Optional** Skip the first X runs. Min: **1**, default: **0** |
| `sort` | String | **Optional** Valid values: `creationDateAsc` or `creationDateDesc`. Default `creationDateDesc` |
| `status` | String | **Optional** Filter by status. Valid values: `notstarted`, `started`, `finished`, `running` |
| `result` | String | **Optional** Filter by result. Valid values: `aborted`, `unknown`, `passed`, `failed` |
| `branch` | String | **Optional** Filter by branch |
| `pipelineId` | String | **Optional** Filter by pipeline |
| `commit` | String | **Optional** Filter by commit hash |
| `sourceRun` | String | **Optional** Filter by source run |
| `author` | String | **Optional** Filter by Wercker username |

#### Response

```no-highlight
Status: 200 OK
```

```json
[
  {
    "id": "577a4dbc3ec144923a02b6f9",
    "url": "https://app.wercker.com/api/v3/runs/577a4dbc3ec144923a02b6f9",
    "branch": "master",
    "commitHash": "cd74a9994712960f19b4b563491f860f98fa7bb5",
    "createdAt": "2016-07-04T11:51:24.851Z",
    "finishedAt": "2016-07-04T11:51:34.284Z",
    "message": "My custom message!",
    "progress": 57,
    "result": "aborted",
    "startedAt": "2016-07-04T11:51:25.996Z",
    "status": "finished",
    "user": {
      "meta": {
        "werckerEmployee": true,
        "username": "tonnu"
      },
      "userId": "549101f36b3ba8733d88ce96",
      "avatar": {
        "gravatar": "bb95c388b227da2ce2f33c0811478095"
      },
      "name": "Toon",
      "type": "wercker"
    },
    "pipeline": {
      "id": "5751377e7e1bd5f17f050bc4",
      "url": "https://app.wercker.com/api/v3/pipelines/5751377e7e1bd5f17f050bc4",
      "createdAt": "2016-06-03T07:53:34.294Z",
      "name": "initial-build",
      "permissions": "public",
      "pipelineName": "initial-build",
      "setScmProviderStatus": true,
      "type": "git"
    }
  },
  {
    "id": "577a48b83828f9673b03e4a9",
    "url": "https://app.wercker.com/api/v3/runs/577a48b83828f9673b03e4a9",
    "branch": "master",
    "commitHash": "cd74a9994712960f19b4b563491f860f98fa7bb5",
    "createdAt": "2016-07-04T11:30:00.171Z",
    "finishedAt": "2016-07-04T11:31:13.958Z",
    "message": "My custom message!",
    "progress": 71,
    "result": "aborted",
    "startedAt": "2016-07-04T11:30:02.167Z",
    "status": "finished",
    "user": {
      "meta": {
        "werckerEmployee": true,
        "username": "tonnu"
      },
      "userId": "549101f36b3ba8733d88ce96",
      "avatar": {
        "gravatar": "bb95c388b227da2ce2f33c0811478095"
      },
      "name": "Toon",
      "type": "wercker"
    },
    "pipeline": {
      "id": "5751377e7e1bd5f17f050bc4",
      "url": "https://app.wercker.com/api/v3/pipelines/5751377e7e1bd5f17f050bc4",
      "createdAt": "2016-06-03T07:53:34.294Z",
      "name": "initial-build",
      "permissions": "public",
      "pipelineName": "initial-build",
      "setScmProviderStatus": true,
      "type": "git"
    }
  }
]
```


### <a name="get-a-run" class="anchor"></a> Get a run

Get the details of a single run.


Returns a `run` object.


***
`GET /api/v3/runs/:run`
***

#### Response

```no-highlight
Status: 200 OK
```

```json
{
  "id": "577a34553828f9673b034ac9",
  "url": "https://app.wercker.com/api/v3/runs/577a34553828f9673b034ac9",
  "branch": "master",
  "commitHash": "cd74a9994712960f19b4b563491f860f98fa7bb5",
  "createdAt": "2016-07-04T10:03:01.559Z",
  "envVars": [
    {
      "key": "SOME_VAR",
      "value": "SOME VALUE"
    }
  ],
  "finishedAt": "2016-07-04T10:06:47.939Z",
  "message": "My custom message!",
  "commits": [],
  "progress": 100,
  "result": "passed",
  "startedAt": "2016-07-04T10:03:18.786Z",
  "status": "finished",
  "user": {
    "meta": {
      "werckerEmployee": true,
      "username": "tonnu"
    },
    "userId": "549101f36b3ba8733d88ce96",
    "avatar": {
      "gravatar": "bb95c388b227da2ce2f33c0811478095"
    },
    "name": "Toon",
    "type": "wercker"
  },
  "pipeline": {
    "id": "5751377e7e1bd5f17f050bc4",
    "url": "https://app.wercker.com/api/v3/pipelines/5751377e7e1bd5f17f050bc4",
    "createdAt": "2016-06-03T07:53:34.294Z",
    "name": "initial-build",
    "permissions": "public",
    "pipelineName": "initial-build",
    "setScmProviderStatus": true,
    "type": "git"
  }
}
```

### <a name="get-run-steps" class="anchor"></a> Get steps for run

Get the steps for a run.

Returns an array of `step` objects.

***
`GET /api/v3/:runId/steps`
***

#### Response

```no-highlight
Status: 200 OK
```

```json
[
  {
    "id": "577a4dbc3ec144923a02b6fb",
    "url": "https://app.wercker.com/api/v3/runsteps/577a4dbc3ec144923a02b6fb",
    "artifactsUrl": null,
    "createdAt": "2016-07-04T11:51:24.854Z",
    "finishedAt": "2016-07-04T11:51:26.562Z",
    "logUrl": "https://app.wercker.com/api/v3/runsteps/577a4dbc3ec144923a02b6fb/log",
    "order": 1,
    "result": "passed",
    "startedAt": "2016-07-04T11:51:26.035Z",
    "status": "finished",
    "step": "get code"
  },
  {
    "id": "577a4dbc3ec144923a02b6fc",
    "url": "https://app.wercker.com/api/v3/runsteps/577a4dbc3ec144923a02b6fc",
    "artifactsUrl": null,
    "createdAt": "2016-07-04T11:51:24.855Z",
    "finishedAt": "2016-07-04T11:51:32.891Z",
    "logUrl": "https://app.wercker.com/api/v3/runsteps/577a4dbc3ec144923a02b6fc/log",
    "order": 2,
    "result": "passed",
    "startedAt": "2016-07-04T11:51:28.593Z",
    "status": "finished",
    "step": "setup environment"
  }
]
```

### <a name="trigger-a-run" class="anchor"></a> Trigger a new run

Trigger a new run for an application.

Returns a `run` object.

It is possible to add environment variables which will be added to the run.
The order of the array will be maintained which makes it possible to use
environment variables which were defined earlier. Any environment variables
defined as part of the application or workflow will be overwritten, if
using the same key.

***
`POST /api/v3/runs/`
***

#### JSON payload

| Name | Type | Description |
|:-----|:-----|:------------|
| `pipelineId` | String | **Required** The id of the pipeline for which a run should be triggered. |
| `sourceRunId` | String | **Optional** The id of the run that should be used as input for this run, including artifacts. This is the same as **chaining** a pipeline. |
| `branch` | String | **Optional** The Git branch that the run should use. If not specified, the default branch will be used. |
| `commitHash` | String | **Optional** The Git commit hash that the run should used. **Requires** `branch` to be set. If not specified, the latest commit is fetched |
| `message` | String | **Optional** The message to use for the run. If not specified, the Git commit message is used. |
| `envVars` | Array of objects | **Optional** Environment variables which should be added to run. Contains objects with `key` and `value` properties. |

#### Response

```no-highlight
Status: 200 OK
```

```json
{
  "id": "577a36013828f9673b035730",
  "url": "https://app.wercker.com/api/v3/runs/577a36013828f9673b035730",
  "branch": "master",
  "commitHash": "cd74a9994712960f19b4b563491f860f98fa7bb5",
  "createdAt": "2016-07-04T10:10:09.860Z",
  "envVars": [
    {
      "key": "SOME_VAR",
      "value": "SOME VALUE"
    }
  ],
  "message": "My custom message!",
  "progress": 0,
  "result": "unknown",
  "status": "notstarted",
  "user": {
    "meta": {
      "username": "tonnu",
      "werckerEmployee": true
    },
    "userId": "549101f36b3ba8733d88ce96",
    "avatar": {
      "gravatar": "bb95c388b227da2ce2f33c0811478095"
    },
    "name": "Toon",
    "type": "wercker"
  },
  "pipeline": {
    "id": "5751377e7e1bd5f17f050bc4",
    "url": "https://app.wercker.com/api/v3/pipelines/5751377e7e1bd5f17f050bc4",
    "createdAt": "2016-06-03T07:53:34.294Z",
    "name": "initial-build",
    "permissions": "public",
    "pipelineName": "initial-build",
    "setScmProviderStatus": true,
    "type": "git"
  }
}
```

### <a name="abort-a-run" class="anchor"></a> Abort a run

Abort an already running `run` instance.

Returns an object.

***
`PUT /api/v3/runs/:runId/abort`
***

#### Response

```no-highlight
Status: 200 OK
```

```json
{
  "id": "577a4dbc3ec144923a02b6f9",
  "url": "https://app.wercker.com/api/v3/runs/577a4dbc3ec144923a02b6f9",
  "branch": "master",
  "commitHash": "cd74a9994712960f19b4b563491f860f98fa7bb5",
  "createdAt": "2016-07-04T11:51:24.851Z",
  "envVars": [
    {
      "key": "SOME_VAR",
      "value": "SOME VALUE"
    }
  ],
  "finishedAt": "2016-07-04T11:51:34.284Z",
  "message": "my custom message!",
  "commits": [],
  "progress": 42,
  "result": "aborted", 
  "startedAt": "2016-07-04T11:51:25.996Z",
  "status": "finished",
  "user": {
    "meta": {
      "werckerEmployee": true,
      "username": "tonnu"
    },
    "userId": "549101f36b3ba8733d88ce96",
    "avatar": {
      "gravatar": "bb95c388b227da2ce2f33c0811478095"
    },
    "name": "Toon",
    "type": "wercker"
  },
  "pipeline": {
    "id": "5751377e7e1bd5f17f050bc4",
    "url": "https://app.wercker.com/api/v3/pipelines/5751377e7e1bd5f17f050bc4",
    "createdAt": "2016-06-03T07:53:34.294Z",
    "name": "initial-build",
    "permissions": "public",
    "pipelineName": "initial-build",
    "setScmProviderStatus": true,
    "type": "git"
  }
}
```
