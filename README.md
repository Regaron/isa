This is Information Security and Audit Project (https://github.com/Regaron/isa.git) doing SQL injection.

## Deployment

The app is deployed at [https://isa-three.vercel.app/](https://isa-three.vercel.app/) where it can be tested without setting up the development environment.

You can start injecting in the home page by selecting from `Attack Dropdown` and pressing `Start Button`.

[Payload Injection](https://isa-three.vercel.app/payload) can be accessed on [https://isa-three.vercel.app/payload](https://isa-three.vercel.app/payload) or from the `Navbar`. This page can be used to `Upload File with SQL Injection Statement` to perform the attack or `Predefined Payload` can be injected by pressing `Default Payload Button`.

#For Running Locally

## System Requirements

- [Node.js 12 or later](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- npm *(installed with Node.js)* or yarn

## Getting Started

First, install the package:

```bash
npm install
# or
yarn install
```

Then, run database migration:

```bash
npm run prisma db push
# or
yarn prisma db push
```
and

```bash
npm run prisma generate
# or
yarn prisma generate
```

Then, enter database credentials in .env file as:

`DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE`.

Example:

`DATABASE_URL=postgresql://ravi:076mscsk009@localhost:5432/sqlinjection`

Open [http://localhost:3000/api/seed](http://localhost:3000/api/seed) once with your browser to fill data into database.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the homepage.


The `pages/api/search` directory is the api for our app which returns only `Released` products. But `SQL Injection` can be done to return other data.