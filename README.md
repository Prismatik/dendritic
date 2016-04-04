## Redbeard
[![Build Status](https://travis-ci.org/Prismatik/redbeard.svg)](https://travis-ci.org/Prismatik/redbeard)

[The framework you use when you're not using a framework.](http://ozwords.org/?p=3240)

Redbeard is a scaffolder and _light_ framework for HTTP APIs. It will give you the bones of an API using JSON Schema, Restify, RethinkDB, tape and promise-y functional ES6.

To use it:

#### Initial Setup

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

- - -

#### Options (switches)

##### Defining Relationships

When creating controllers you also automatically create relationships to other models using the `-r` switch. As with controller model names, the related model names must be singular.

For example:-

```
redbeard controller product -r category,order,warehouse
```

This will add the necessary properties to your model schema as well as setup tests to ensure the related model exists.

- - -

NOTES:

* Rethink must be version 2.2 or greater to run the resulting app and/or test suite. Anything earlier doesn't support atomic changefeeds (includeInitial).
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
