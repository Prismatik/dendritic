# Redbeard
[![Build Status](https://travis-ci.org/Prismatik/redbeard.svg)](https://travis-ci.org/Prismatik/redbeard)

Redbeard is a scaffolder and _light_ framework for HTTP APIs. It will give you
the bones of an API using JSON Schema, Express and RethinkDB.

Redbeard is designed to work in the Pirate stack, hence the name: Redbeard The Pirate.

If you're unfamiliar, the Pirate stack is made up of:

* REST
* RethinkDB
* React
* Redux
* Realtime

(Get it? RRRRR)

- - -

## Development

### Requirements

- [Rethinkdb 2.3](https://rethinkdb.com/docs/install)

### Getting started

```
npm install -g redbeard
mkdir my_new_project && cd my_new_project
redbeard base project_name_singular
```

And you'll have a minimal, well thought-out base app scaffold. Next:

- - -

### Creating Controllers

```
redbeard resource model_name_singular
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
redbeard resource product -s product_category,wholesaler
```
OR
```
redbeard resource product -m purchaser,warehouse_location
```

This will add the necessary properties to your model schema as well as setup
tests to ensure the related model exists (endpoint can be accessed via a GET
request).

Note: You can also use this switch when creating users since users are
effectively just a special type of controller / schema i.e.
`redbeard user -s drivers_license -m motor_vehicle`

- - -

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

- - -

### Migrations

Redbeard can provide a framework for running migrations against the rethinkdb database.
To scaffold the migration framework run...

```
redbeard migration
```

You can then use the following commands...

#### Create a migration

```
migration create migration_name
```

This will generate a migration file and a migration test file. The migration file contains an `up` function to run your migration and a `down` function to rollback your migration. Migrations are created with the name you specify but prepended with a timestamp which ensures the files are ordered based on their creation date.

#### Run migrations

```
migrate up
```

This will run all migrations (execute the `up` function) that have not yet been run i.e. files in the `/migrations` folder. Redbeard tracks which migrations have already been run in the `_migrations` table in rethinkdb.

#### Rollback migrations

```
migrate down file_name
```

This will rollback all migrations (execute the `down` function) that have previously been run, up until AND including the file_name that you specify. For example if you had three migrations file1.js, file2.js, file3.js and all of these have been run, if you then use `migrate down file2.js`, `file2.js` and `file3.js` would be rolled back.

#### List migrations

```
migrate list
```

This will list all migrations that exist (based on the files found in `/migrations`) and inform you if they have yet been run.

#### Show mutex

```
migrate show_mutex
```

This will inform the user if the migrations table is currently locked which means either a migration is currently running OR a prior migration has failed and the lock has not been manually released.

#### Release mutex

```
migrate release_mutex
```

This will release any lock that exists on the migrations table, necessary when a migration has failed and the table has therefore not been automatically unlocked.

- - -

## Notes

* Project names and model names should be singular and not plural. e.g. `redbeard model motor_vehicle`. This will be automatically pluralized as needed.
* Where your project name and/or model name contains more than one word, i.e. product categories, this must be input in snake case (underscore separators between words) e.g. `redbeard model product_category`. This will be automatically be converted to camelCase as needed.
* There is a default .env file at example.env. You may `cp example.env .env`
when developing locally, but you should never commit this to source control.
The risk is that it doesn't get overridden in production and testing
variables leak to prod.

- - -

## TODO

* Make it optional whether to use Auth or an internal user store
* Add generator for auth middleware(s)
* Investigate a graphql implementation
