# User CRUD API Assessment

This is a User CRUD (Create, Read, Update, Delete) application built using **Node.js**, **TypeScript**, and **MongoDB**. It provides a REST API's to manage user data operation.

# TechStack Used

- Node.js
- Express.js
- TypeScript
- MongoDB

# Pre-requisites

- Install Node.js
- VSCode
- MongoDB
- Postman(optional)

# Environment vars

This project uses the following environment variables:

- PORT = 3000
- MONGO_DB_URI="mongodb://localhost:27017/userDB"
- REDIS_URI="redis://localhost:6379"

# Getting started

- To Install dependencies go to the project root folder & execute below command

```
npm install
```

- Build and run the application

```
npm run dev
```

# Project Structure

The folder structure of this app as below:

| Name                        | Description                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| **dist**                    | Contains the distributable files from your application build.                            |
| **node_modules**            | Contains all npm dependencies                                                            |
| **src**                     | Contains source code that will be compiled to the dist dir                               |
| **src/config**              | Application configuration including environment-specific configs                         |
| └── dbConfig.ts             | Contains MongoDB configuration                                                           |
| └── redisConfig.ts          | Contains Redis configuration                                                             |
| **src/controllers**         | Controllers define functions to serve various express routes                             |
| └── userController.ts       | Handles user-related request logic                                                       |
| **src/middleware**          | contain Middlewares                                                                      |
| └── validationMiddleware.ts | middleware function to validate request body & param                                     |
| **src/models**              | Mongoose schemas and                                                                     |
| └── userModel.ts            | Contain user schema for MongoDB                                                          |
| **src/routes**              | Contain all express routes                                                               |
| └── userRoutes.ts           | Defines routes as well as integrated validation middleware to validate incoming requests |
| **src/schemaValidation**    | Conatain schema validation for request payloads using joi.                               |
| └── userSchemaValidation.ts | Contain joi validation rules for request payloads                                        |
| **src**/index.ts            | Entry point of the Express app                                                           |
| .env                        | Conatain all environment variables                                                       |
| docker-compose.yml          | Docker Compose configuration for multi-container setup                                   |
| Dockerfile                  | Docker configuration for building the app container                                      |
| package.json                | Project metadata and dependency definitions                                              |
| package-lock.json           | Contain exact versions of installed dependencies                                         |
| jest.config.json            | Conatain configuration for Jest testing framework                                        |
| swagger.yml                 | Conatain API documentation                                                               |
| tsconfig.json               | TypeScript compiler configuration                                                        |

### Running the build

| Npm Script      | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| `start`         | Runs the application directly using ts-node                               |
| `dev`           | Starts the development server with auto-reload on TypeScript file changes |
| `build`         | Compiles the TypeScript source code into JavaScript                       |
| `test`          | Executes the unit test suite using Jest                                   |
| `test-coverage` | Runs unit tests and generates code coverage report                        |

## Testing

Test files are created under test folder.

The tests are written using jest.

```
"jest": "^29.7.0"
```

### Run tests using NPM Script

```
npm run test
```

### Run test coverage using NPM Script

```
npm run test-coverage
```

# Docker

Build & run containers

```
docker-compose up --build
```

stop

```
docker-compose down
```

stop & remove

```
docker-compose down -v
```

# API Documentation using Swagger

Swagger API doc endpoint: http://localhost:3000/api-docs

# API Endpoints

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| GET    | /users     | Get all users     |
| POST   | /users     | Create new user   |
| GET    | /users/:id | Get user by ID    |
| PATCH  | /users/:id | Update user by ID |
| DELETE | /users/:id | Delete user by ID |
