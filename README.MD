## Store Front Backend

i create this project for my second project submitting this project created using node js as backend and express server, pg, typescript language, eslint, prettier and jasmine unit testing .

## Installation

- Run `npm install`   to install the dependencies in `package.json`
- Run `npm run build` to build the project
- Run `npm run dev` to host the server on http://localhost:5000/

    - Other scripts
        - Run `npm run watch`          to host the server in watch mode
        - Run `npm run test`           to test the server with jasmine-ts
        - Run `npm run migrate`        to migrate the databases in dev/test
        - Run `npm run dev`            to host the server in development mode
        - Run `npm run lint`           to modify files from errors/warrnings with eslint
        - Run `npm run prettier`       to modify files to look better for reading
        - Run `npm run migrate:reset`  to reset migrate in databases dev/test
##

## Server Details
    SERVER HOST         : localhost
    SERVER PORT         : 6000

#  Set up the database and connect
- Connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a new user `CREATE USER admin WITH PASSWORD '123456789';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE storefront;`
    - `CREATE DATABASE storefront_test;`
- Connect to the databases and grant all privileges to the user
    - Grant for dev database
        - `\c storefront`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront TO admin;`
    - Grant for test database
        - `\c storefront_test`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO admin;`

# Database Details
    DB_PORT             : 5433
    DB_NAME_DEVELOPMENT : storefront
    DB_NAME_TEST        : storefront_test
    DB_USERNAME         : admin
    DB_PASSWORD         : 123456789



## Auther
   Dev : Islam Salah Elmogy

