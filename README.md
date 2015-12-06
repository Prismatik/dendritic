## Claytons

The framework you use when you're not using a framework.

Claytons is a scaffolder for HTTP APIs. It will give you the bones of an API using JSON Schema, Restify, RethinkDB, tape and promise-y functional ES6.

To use it:

`npm install -g claytons`
`mdkir my-new-project && cd my-new-project`
`claytons base project-name-singular project-name-plural`

And you'll have a minimal, well thought-out base app scaffold. Next:

`claytons controller singular plural`

And it will add routes, a controller and database bootstrapping. You'll have Create, Read, Update and Delete. You can pass filter params for any property of your model to search the database on GET. All updates will be checked against your JSON schema for validity.
