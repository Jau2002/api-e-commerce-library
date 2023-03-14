<h1 align='center'>API E-commerce Library</h1>

E-commerce for the sale of books. The system is able to manage inventory, sell, buy, a shopping cart, register users, a user profile and users can authenticate.

---

## Table of Contents

- [Setup](#setup-installation)
  - [Prerequisites](#mandatory-prerequisites)
  - [Installation](#installing-dependencies)
  - [Connection](#configure-the-connection)
  - [Run](#running-the-api)
- [How to Use?](#usage)
  - [Register](#sign-up)
  - [Auth](#sign-in)
  - [Vue User](#me)

---

## Setup Installation

### Prerequisites

Before using this application, make sure you have the following prerequisites installed on your system:

#### Mandatory Prerequisites

- [Node.js](https://nodejs.org/en/download/): This is a JavaScript _runtime environment_ that is required to run the application. Follow the instructions on the official Node.js website to download and install the latest version for your operating system.

- [PostgreSQL](https://www.postgresql.org/download/): This is an open-source _relational database management system_ that is required to store and manage the data for the application. Follow the instructions on the official **PostgreSQL** website to download and install the latest version for your operating system.

##### Optional Prerequisites

- **PNPM**: This is a fast, disk space efficient alternative to the default npm client used by Node.js. While it is not required to use this client, it is recommended for faster installations and better disk usage. To install _PNPM_, run the following command:

```bash
npm install -g pnpm
```

Once you have installed all of the mandatory prerequisites and optionally installed _PNPM_, you are ready to use the application.

### Installation and Usage

To use this application, follow the steps below:

#### Installing Dependencies

1. Open a terminal window and navigate to the root directory of the application.

2. Run the following command to install the necessary dependencies using npm:

```bash
npm install
```

Alternatively, if you have installed _PNPM_, you can run the following command:

```bash
pnpm install
```

### Configure the Connection

1. Create file Create a file called **.env**

2. Add environment variables **DATABASE_URL** & **JWT_SECRET_KEY**

3. Replace the values for your credentials **db-user** & **db-password**

4. Add the value whatever secret token **JWT_SECRET_KEY**

5. Save the .env file.

&. Run the application using

```dotenv
DATABASE_URL="postgresql://db-user:db-password@localhost:5432/library"

JWT_SECRET_KEY=********
```

### Running the API

After installing the dependencies, run the following command to start the backend server using npm:

```bash
npm run dev
```

If you have installed PNPM, run the following command instead:

```bash
npm dev
```

This will start the backend server on <http://localhost:${PORT>}.

---

## Usage

### Sign up

The user can be able to register, provide a token and be able to authenticate by username, password and name.

```http
POST http://localhost:8080/sign/up HTTP/1.1
content-type: application/json

{
  "name": "Your Name",
  "email: "your@email.com",
  "password": "******"
}
```

[x] - If the user's email is already registered, _respond_ **409**

```json
{
  "message": "the user´s exists"
}
```

If you had no problem with the request, you have a _response_ **201**

```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ************"
}
```

### Sign in

The user can enter their username and password to register

```http
POST http://localhost:8080/sign/in HTTP/1.1
content-type: application/json

{
    "email: "your@email.com",
    "password": "******"
}
```

[x] - If the user does not exist in the database _respond_ **404**

```json
{
  "message": "the user´s not exists"
}
```

[x] - If the user does not exist in the database _response_ **404**

```json
{
  "message": "the user´s not exists"
}
```

[x] - If the user exists, but does not have the permissions _res_ **401**

```json
{
  "auth": false,
  "message": "token is invalid"
}
```

If you had no problem with the request, you have a _response_ **200**

```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ************"
}
```

### Me

The user can view their profile data

```http
GET http://localhost:8080/sign/me HTTP/1.1
```

[x] - If the user does not exist in the database _response_ **404**

```json
{
  "message": "the user´s not exists"
}
```

If you had no problem with the request, you have a _response_ **200**

```json
{
  "id": 1,
  "name": "Your Name",
  "email: "your@email.com",
  "address": null,
  "Cart": null,
  "photo": null
}
```
