## Redbeard
[![Build Status](https://travis-ci.org/Prismatik/redbeard.svg)](https://travis-ci.org/Prismatik/redbeard)

[The framework you use when you're not using a framework.](http://ozwords.org/?p=3240)

Redbeard is a scaffolder and _light_ framework for HTTP APIs. It will give you the bones of an API using JSON Schema, Restify, RethinkDB, tape and promise-y functional ES6.

### Development

#### Requirements

- Rethinkdb 3.0

#### Install
```
npm install -g redbeard
mdkir my-new-project && cd my-new-project
redbeard base project-name-singular
```
And you'll have a minimal, well thought-out base app scaffold. Next:

#### Creating Controllers

```
redbeard controller model-name-singular
```
And it will add routes, a controller and database bootstrapping. You'll have Create, Read, Update and Delete. You can pass filter params for any property of your model to search the database on GET. All updates will be checked against your JSON schema for validity.

#### Creating Users

```
redbeard user [model-name-singular]
```

This will create a controller (as above) but with additions to cater for a user model. This includes an email and password property on the schema, modified controller logic to ensure when a password is provided this is hashed and saved and also a sign in route which returns a JWT for use in authentication.

Finally providing a model-name when running the command is optional, the model name will default to user, but an alternative can be provided i.e. `admin`.

- - -

#### Options (switches)

##### Defining Relationships

When creating controllers you also automatically create relationships to other models using the `-s` or `-m` switch.

* `-s` is used for singular relationships (model stores a singular uuid)
* `-m` is used for multiple relationships (model stores an array of uuids)

As with controller model names, the related model names must be singular.

For example:-

```
redbeard controller product -s category,wholesaler
```
OR
```
redbeard controller product -m purchaser,location
```

This will add the necessary properties to your model schema as well as setup tests to ensure the related model exists (endpoint can be accessed via a GET request).

- - -

NOTES:
* Project names and model names should be singular, redbeard will pluralize these names as required.

TODO:

* Add text explaining the assertion to all of the test assertions
* Add special User model type with signin, out, password reset, etc
* Make it optional whether to use Auth or an internal user store
* Potentially use a before/after/each plugin for Tape, or just switch to Mocha
* Investigate other routing/middleware frameworks. Express, Hapi, Koa, etc.
* Add generator for auth middleware(s)
* Figure out whether controller is the best terminology
* Investigate a graphql implementation
