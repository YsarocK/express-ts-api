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

## Project structure

test

### API

test

[API Documentation](api/README.md)

### Database

#### Diagram

![Diagram](diagram.png)

#### Models

test

### Frontend

test

[Frontend Documentation](frontend/README.md)

## Améliorations

test

---

[Sami Lafrance](https://www.samilafrance.com/) | [Paul Cotogno](https://paulcotogno.com/) | [Etienne Moureton](https://www.etiennemoureton.fr/) | [Pierre Keller](https://pierrekeller.com/)
