# AGENDIFY BACKEND

Agendify is a backend application for scheduling services, allowing professionals from various fields (such as doctors, hairdressers, manicurists, etc.) to manage their schedules and their clients to make appointments easily and quickly.

## Features

- User registration and authentication (professionals and clients)
- Creation, listing, and management of appointments
- Validation of available time slots
- Support for multiple types of services

## Technologies Used

- Node.js
- Express
- Typescript
- Prisma ORM
- PostgreSQL
- JWT for authentication
- Bcrypt for password hashing

## Project Setup

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

```sh
git clone https://github.com/guifrribeiro/agendify-backend.git
cd agendify-backend
```

2. Install the dependencies:

```sh
yarn install
```

3. Configure the environment variables

Create a .env file in the root of the project and add the following variables:

```sh
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
JWT_SECRET=your_secret_key
PORT=3000
```

4. Run the database migrations:

```sh
npx prisma migrate dev
```

5. Start the server:

```sh
yarn dev
```

The server will be running at http://localhost:3000

## Project Structure
```sh
.env
.gitignore
@types/
  express/
    index.d.ts
package.json
prisma/
  migrations/
    ...
  schema.prisma
README.md
routes/
  auth.routes.ts
src/
  controllers/
    auth.controller.ts
  middlewares/
    auth.middleware.ts
  prisma.ts
  repositories/
    appointment.repository.ts
    user.repository.ts
  server.ts
  services/
    auth.service.ts
  utils/
    hash.ts
tsconfig.json
```

## Endpoints

### Authentication

```sh
POST /auth/register: Register a new user
POST /auth/login: User login
```

### Appointments

```sh
POST /appointments: Create a new appointment
GET /appointments: List appointments
```

## Contribution

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the MIT License.