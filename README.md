# Express TS API

## Documentation

### Requirements

To install the project, you need to have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.

To run the project, you need to have [NodeJS](https://nodejs.org/en/) installed on your machine, with the version `18.x.x` or higher.

### Commands

#### Install

This command will install the project and all its dependencies for the API and the frontend.

It will also create a `.env` file for the database, based on the `.env` file in the `api` folder.

At the end of the installation, it will create the docker containers for the database, the API and the frontend.

```bash
make install
```

#### Start

This command will run the docker containers for the database, the API and the frontend.

```bash
make start
```

#### Stop

This command will stop the docker containers for the database, the API and the frontend.

```bash
make stop
```

#### Restart

This command will restart the docker containers for the database, the API and the frontend.

```bash
make restart
```

#### Purify

This command will delete everything related to the project, to start again with a purify project.

```bash
make purify
```

### Other documentation

- [API](api/README.md)
- [Frontend](frontend/README.md)

## Structure

### API

The API is built with [Express](https://expressjs.com/) and [TypeScript](https://www.typescriptlang.org/).

The API structure is the following:

```bash
api
├── src
│   ├── config
│   ├── controllers
│   ├── database
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── types
│   ├── utils
```

> Specific documentation for the API can be found [here](api/README.md).

### Database

The database is a [MariaDB](https://mariadb.org/) database and we are using [Sequelize](https://sequelize.org/) as an ORM.

The database diagram is the following:

![Diagram](diagram.png)

### Frontend

The frontend is built with [NuxtJS](https://nuxtjs.org/) and [TypeScript](https://www.typescriptlang.org/).

The frontend structure is the following:

```bash
frontend
├── src
│   ├── assets
│   ├── components
│   ├── layouts
│   ├── pages
│   ├── plugins
│   ├── public
│   ├── services
│   ├── store
│   ├── types
```

> Specific documentation for the frontend can be found [here](frontend/README.md).

## Workflow

test

Logger Winston

```ts
Logger.error('This is an error log');
Logger.warn('This is a warn log');
Logger.info('This is a info log');
Logger.http('This is a http log');
Logger.debug('This is a debug log');
```

## Improvements

- [ ] Add unit tests for the API
- [ ] Add end-to-end tests for the frontend
- [ ] Add a search bar for the admin panel
- [ ] Add differents exercices that the admin can choose by creating a new session
- [ ] Add a timer for the session
- [ ] Add a way to control who is connected to the session and block the access to the session if the user is not in the list

And many more...

---

[Sami Lafrance](https://www.samilafrance.com/) | [Paul Cotogno](https://paulcotogno.com/) | [Etienne Moureton](https://www.etiennemoureton.fr/) | [Pierre Keller](https://pierrekeller.com/)
