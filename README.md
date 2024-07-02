I have practiced [this tutorial](https://en-ambi.com/itcontents/entry/2023/02/17/093000/).

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

MySql database is required to run the app. You can use docker to run a MySql database.

```bash
docker-compose up -d
```

## Migrations

```bash
# generate migration
npm run typeorm:generate-migration --name=CreateUsers

# run migration
npm run typeorm:run-migrations

# check out the database
docker-compose exec db mysql -u root -ppassword -D test -e "DESC users"
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
