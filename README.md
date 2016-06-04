# Redbeard
[![Build Status](https://travis-ci.org/Prismatik/redbeard.svg)](https://travis-ci.org/Prismatik/redbeard)

Redbeard is a scaffolder and _light_ framework for HTTP APIs. It will give you
the bones of an API using JSON Schema, Express and RethinkDB.

## Development

### Requirements

- [Rethinkdb 2.3](https://rethinkdb.com/docs/install)

### Getting started

```
npm install -g redbeard
mdkir my_new_project && cd my_new_project
redbeard base project_name_singular
```

And you'll have a minimal, well thought-out base app scaffold. Next:

### Creating Controllers

```
redbeard model model_name_singular
```
And it will add routes, a controller and database bootstrapping. You'll have
Create, Read, Update and Delete. You can pass filter params for any property
of your model to search the database on GET. All updates will be checked
against your JSON schema for validity.

#### Defining Relationships

When creating controllers you also automatically create relationships to other
models using the `-s` or `-m` switch.

* `-s` is used for singular relationships (model stores a singular uuid)
* `-m` is used for multiple relationships (model stores an array of uuids)

As with model names, the related model names must be singular.

For example:-

```
redbeard model product -s product_category,wholesaler
```
OR
```
redbeard model product -m purchaser,warehouse_location
```

This will add the necessary properties to your model schema as well as setup
tests to ensure the related model exists (endpoint can be accessed via a GET
request).

Note: You can also use this switch when creating users since users are
effectively just a special type of controller / schema i.e.
`redbeard user -s drivers_license -m motor_vehicle`

### Creating Users

```
redbeard user model_name_singular
```

This will create a controller (as above) but with additions to cater for a
user model. This includes an email and password property on the schema,
modified controller logic to ensure when a password is provided this is
hashed and saved and also a sign in route which returns a JWT for use in
authentication.

Finally providing a model-name when running the command is optional, the model
name will default to user, but an alternative can be provided i.e. `admin`.

## Notes

* Project names and model names should be singular and not plural. e.g. `redbeard model motor_vehicle`. This will be automatically pluralized as needed.
* Where your project name and/or model name contains more than one word, i.e. product categories, this must be input in snake case (underscore separators between words) e.g. `redbeard model product_category`. This will be automatically be converted to camelCase as needed.
* There is a default .env file at example.env. You may `cp example.env .env`
when developing locally, but you should never commit this to source control.
The risk is that it doesn't get overridden in production and testing
variables leak to prod.

## TODO

* Add text explaining the assertion to all of the test assertions
* Make it optional whether to use Auth or an internal user store
* Add generator for auth middleware(s)
* Investigate a graphql implementation
