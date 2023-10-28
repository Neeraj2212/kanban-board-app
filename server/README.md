## Kanban Board Server
This is the server side of the Kanban Board application. It is built using Express.js and sequalize (postgres).

### Pre-requisites
- Postgres must be installed and running on `localhost:5432`
- There should be a database to use for the application
- There should be a database user with access to the database


### Environment Variables Setup
- Create a `.env.development.local` file in the server directory of the project
- Add the following environment variables to the file:
```
DB_HOST= localhost
DB_PORT= 5432
DB_DATABASE= <DATABASE_NAME>
DB_USERNAME= <DB_USERNAME>
DB_PASSWORD= <DB_PASSWORD>
PORT= 5000
LOG_FORMAT= tiny
SECRET_KEY= <SECRET_KEY>
```

### How to run
1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start the application
4. Open `http://localhost:5000` in your browser
5. The server will automatically restart if you make any changes to the code

### Folder Structure
```
.
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.ts
│   ├── config
│   │   └── index.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── column.contoller.ts
│   │   ├── index.controller.ts
│   │   └── task.controller.ts
│   ├── databases
│   │   └── index.ts
│   ├── dtos
│   │   ├── columns.dto.ts
│   │   ├── tasks.dto.ts
│   │   └── users.dto.ts
│   ├── exceptions
│   │   └── HttpException.ts
│   ├── interfaces
│   │   ├── auth.interface.ts
│   │   ├── columns.interface.ts
│   │   ├── routes.interface.ts
│   │   ├── tasks.interface.ts
│   │   └── users.interface.ts
│   ├── middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models
│   │   ├── associations.ts
│   │   ├── columns.model.ts
│   │   ├── tasks.model.ts
│   │   └── users.model.ts
│   ├── routes
│   │   ├── auth.route.ts
│   │   ├── column.route.ts
│   │   ├── index.route.ts
│   │   └── task.route.ts
│   ├── server.ts
│   ├── services
│   │   ├── auth.service.ts
│   │   ├── column.service.ts
│   │   └── task.service.ts
│   └── utils
│       ├── util.ts
│       └── validateEnv.ts
└── tsconfig.json
```

### Folder Description

- The `src` folder contains the source code of the project
- The `config` folder contains the configuration of the server.
- The `controllers` folder contains the controllers of the server. Each controller is responsible for handling the requests to a specific route.
- The `databases` folder contains the database connection.
- The `dtos` folder contains the data transfer objects used in the server.
- The `exceptions` folder contains the custom exceptions used in the server.
- The `interfaces` folder contains the interfaces used in the server.
- The `middlewares` folder contains the middlewares used in the server.
- The `models` folder contains the models and associations of the database.
- The `routes` folder contains the routes of the server.
- The `services` folder contains the services of the server.
- The `utils` folder contains the utility functions used in the server.
  