>Note: These endpoints only work if you have Workflows enabled!

## Workflows

* [Get all workflows](#get-all-workflows)
* [Get a workflow](#get-a-workflow)

### <a name="get-all-workflows" class="anchor"></a> Get all workflows

Get the last 10 workflows. 

Returns an array of `workflow` objects.


***
`GET /api/v3/workflows`
***

#### URL querystring paramaters

| Name | Type | Description |
|:-----|:-----|:------------|
| `applicationId` | String | **Required** The id of the application. |
| `limit` | Integer | **Optional** Specify how many workflow objects should be returned. Max: **20**, default: **10** |
| `skip` | Integer | **Optional** Skip the first X runs. Min: **0**, default: **0** |
| `sort` | String | **Optional** Valid values: `creationDateAsc` or `creationDateDesc`. Default `creationDateDesc` |

#### Response

```no-highlight
Status: 200 OK
```

```json
[
  {
    "url": "https://app.wercker.com/api/v3/workflows/577a5a643828f9673b0459d5",
    "createdAt": "2016-07-04T12:45:24.379Z",
    "data": {
      "branch": "api-docs-v3",
      "message": "add docs for run endpoints",
      "sourceRunId": "577a588acf55107c1d08aa5e"
    },
    "id": "577a5a643828f9673b0459d5",
    "items": [
      {
        "data": {
          "targetName": "staging",
          "pipelineId": "570bf80788e0962388e88f18",
          "restricted": false,
          "totalSteps": 8,
          "currentStep": 8,
          "stepName": "slack-notifier",
          "runId": "577a5a643828f9673b0459d6"
        },
        "id": "577a5a643828f9673b0459d4",
        "progress": 100,
        "result": "passed",
        "status": "finished",
        "type": "run",
        "updatedAt": "2016-07-04T12:46:06.325Z"
      }
    ],
    "startedAt": "2016-07-04T12:45:28.005Z",
    "trigger": "workflow",
    "updatedAt": "2016-07-04T12:46:02.085Z",
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
    }
  },
  {
    "url": "https://app.wercker.com/api/v3/workflows/577a59a23ec144923a02ef2f",
    "createdAt": "2016-07-04T12:42:10.784Z",
    "data": {
      "branch": "api-docs-v3",
      "message": "add docs for run endpoints",
      "sourceRunId": "577a588acf55107c1d08aa5e"
    },
    "id": "577a59a23ec144923a02ef2f",
    "items": [
      {
        "data": {
          "targetName": "staging",
          "pipelineId": "570bf80788e0962388e88f18",
          "restricted": false,
          "currentStep": 1,
          "stepName": "get code",
          "runId": "577a59a23ec144923a02ef30"
        },
        "id": "577a59a23ec144923a02ef2e",
        "progress": 5,
        "result": "aborted",
        "status": "finished",
        "type": "run",
        "updatedAt": "2016-07-04T12:45:23.913Z"
      }
    ],
    "startedAt": "2016-07-04T12:42:50.935Z",
    "trigger": "workflow",
    "updatedAt": "2016-07-04T12:45:23.912Z",
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
    }
  }
]
```

### <a name="get-a-workflow" class="anchor"></a> Get a workflow

Get the details of a single workflow.

Returns a `workflow` object, which contains a collection of runs.


***
`GET /api/v3/workflows/:workflowId`
***

#### Response

```no-highlight
Status: 200 OK
```

```json
{
  "url": "https://app.wercker.com/api/v3/workflows/577a5a643828f9673b0459d5",
  "application": {
    "id": "54c9168980c7075225004157",
    "url": "https://app.wercker.com/api/v3/applications/wercker/docs",
    "name": "docs",
    "owner": {
      "type": "wercker",
      "name": "wercker",
      "avatar": {
        "gravatar": "33a5bfbcf8a2b90f40e849b6f1fa5eeb"
      },
      "userId": "55310d295732ce8a41000054",
      "meta": {
        "username": "wercker",
        "werckerEmployee": false
      }
    },
    "createdAt": "2015-01-28T17:04:09.851Z",
    "updatedAt": "2016-04-11T18:21:52.826Z",
    "privacy": "public",
    "stack": 6
  },
  "createdAt": "2016-07-04T12:45:24.379Z",
  "data": {
    "branch": "api-docs-v3",
    "message": "add docs for run endpoints",
    "sourceRunId": "577a588acf55107c1d08aa5e"
  },
  "id": "577a5a643828f9673b0459d5",
  "items": [
    {
      "data": {
        "targetName": "staging",
        "pipelineId": "570bf80788e0962388e88f18",
        "restricted": false,
        "totalSteps": 8,
        "currentStep": 8,
        "stepName": "slack-notifier",
        "runId": "577a5a643828f9673b0459d6"
      },
      "id": "577a5a643828f9673b0459d4",
      "progress": 100,
      "result": "passed",
      "status": "finished",
      "type": "run",
      "updatedAt": "2016-07-04T12:46:06.325Z"
    }
  ],
  "startedAt": "2016-07-04T12:45:28.005Z",
  "trigger": "workflow",
  "updatedAt": "2016-07-04T12:46:02.085Z",
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
  }
}
```
