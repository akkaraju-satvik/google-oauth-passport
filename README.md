# Google OAuth2 Authentication using Passport.js

This is an example of how to use Passport.js to authenticate users using Google OAuth2.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Google OAuth2 Credentials](https://console.developers.google.com/apis/credentials)

### Setting up the project

Clone the repository and install dependencies.

```bash
git clone https://github.com/akkaraju-satvik/google-oauth-passport google-oauth
cd google-oauth
```

#### Server

- Navigate to the `server` directory.

```bash
cd server
```

- Install dependencies using `npm` or `yarn`.

```bash
npm install
# or
yarn install
```

- Create a `.env` file in the root directory of the project and add the environment variables.

```bash
cp .env.example .env
```

- Create a new PostgreSQL database and add the database URL to the `.env` file.

```bash
DATABASE_URL=postgres://username:password@localhost:5432/database_name
```

- Start the development server.

```bash
npm start
```

#### Client

- Navigate to the `client` directory.

```bash
cd client
```

- Install dependencies using `npm` or `yarn`.

```bash
npm install
# or
yarn install
```

- Run the development server.

```bash
npm start
```
