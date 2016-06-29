## API Reference

Welcome to the documentation of the wercker API. Before starting to use the API,
be sure to check out this document. Also have a look at the getting started
guides, such as [authentication](getting-started/authentication.html), and
[clients](getting-started/clients.html).

The current version of the API should be considered to be an _alpha_ version.
Though we will try to keep it backwards compatible, we cannot make that
guarantee at this moment.

### Location

All endpoints in the documentation use relative paths. The host and the prefix
path needs to be the following:

```no-highlight
https://app.wercker.com/api/v3/
```

### Conventions

The wercker API uses several conventions. These next section will describe these
conventions.

#### Representations

We currently have two ways of representing a resource: detailed and summary.
Where summary will contain a subset of information of the detailed
representation.

The summary representation will be used in lists or when embedded in another
resource. The detailed representation will contain all information related to
the resource.

#### HTTP verbs

- `GET` Used to retrieve resources.
- `POST` Used to create a resource, or to execute a action on a resource.
- `PUT` Used to _completely_ replace a resource.
- `PATCH` Used to update one or more properties of a resource.
- `DELETE` Used to delete a resource.

#### Errors

We map errors on the following HTTP status codes:

- `400` Generic error that the client used an invalid request.
- `401` The requested resource requires authentication.
- `403` You do not have access to the requested resource.
- `404` The requested resource does not exists.
- `422` The payload was in a correct format, but we were not able to process it.
- `500` Something went wrong while processing the request, most likely not
caused by the request.

For more detailed information regarding the error we also send the following
JSON object:

```json
{
  "message": "You are not authorized to access the resource",
  "error": "Unauthorized",
  "statusCode": 401
}
```

The `error` and `statusCode` contain information related to the HTTP status
code. The `message` contains a specific message related to the error. The `message`
does not contain sensitive information and is formatted so that it can be displayed
on a user interface.

Certain error messages also include a `code`. The `code` is unique in the context
of the endpoint and can be used to provide further assistance to the user. An
example of a code could be `"code": "stripe_card_declined"`.

If an incorrect parameter or incorrect payload was used, we also include a
`details` properties object:

```json
{
  "details": [
    {
      "context": {
        "key": "status",
        "valids": "notstarted, started, finished, running"
      },
      "type": "any.allowOnly",
      "path": "status",
      "message": "status must be one of notstarted, started, finished, running"
    }
  ],
  "message": "status must be one of notstarted, started, finished, running",
  "error": "Bad Request",
  "statusCode": 400
}
```

#### Time

Currently all time related fields will use the UTC timezone, and will use the
following format:

```no-highlight
2015-12-31T15:30:59.500Z
```
