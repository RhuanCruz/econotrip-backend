# econotrip API

API for econotrip application, made using Nodejs and Typescript.

## Getting started

### Install dependencies

```shell
yarn install
```

### Running locally

```shell
yarn start
```

### Database

Postgres is the Database used to this application, after modifications in entities, it's possible generate automatic migrations and applying using follow command:

```shell
yarn migration <migration_name>
```

If you do NOT want apply changes, you have to execute the following command:

```shell
yarn migration <migration_name> --create-only
```

If you are in a new enviorment and need to execute the migrations, use following command:

```shell
yarn migrate
```

To run seeds you should execute thsi command:

```shell
yarn seed
```

### Generating swagger documentation

To generate swagger documentation is necessary execute the following command:

```shell
yarn run tsoa spec
```

 ## Built With
 
 * [Typescript](https://www.typescriptlang.org/) - Open source programming language
 * [Express](https://expressjs.com/pt-br/) - REST API Framework
 * [Prisma](https://www.prisma.io/) - Database ORM
 
 ## Authors
 
 * **Leoberto Soares** - [leossoaress](https://github.com/leossoaress)