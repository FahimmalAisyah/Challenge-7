# Car management system API for backend

We created this API for the purpose of learning about Rest APIs

## Demo

http://localhost:${PORT}

example : http://localhost:${PORT}/api/v1/cars

## Tech Stack

**Server:** Express js, Sequelize, PostgreSql

## Installation

Clone the project

```bash
  git clone https://github.com/Irfiyandaabidin/Binar-CH7-Testing.git my-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

## Setup Database

Create database

```bash
  npm run db:create
```

Migration model database

```bash
  npm run db:migrate
```

Seed data

```bash
  npm run db:seed
```

## Run Locally

Start the server

```bash
  npm run start
```

Development

```bash
  npm run develop
```

## Testing

Start the server

```bash
  npm run test
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_PORT`

`JWT_SIGNATURE_KEY`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

`DB_HOST`

## API Reference

#### Get all cars

```http
  GET /v1/cars
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `-`       | `-`  | -           |

#### Add new car

```http
  POST /v1/cars/
```

| Body    | Type     | Description   |
| :------ | :------- | :------------ |
| `name`  | `string` | **Required**. |
| `price` | `float`  | **Required**. |
| `size`  | `string` | **Required**. |
| `image` | `string` | **Required**. |

#### Rent a car

```http
  POST /v1/cars/${id}/rent
```

| Body            | Type   | Description   |
| :-------------- | :----- | :------------ |
| `rentStartedAt` | `date` | **Required**. |
| `rentEndedAt`   | `date` | **Required**. |

#### Get car by id

```http
  GET /v1/cars/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### update car

```http
  PUT /v1/cars/${id}
```

| Body    | Type     | Description   |
| :------ | :------- | :------------ |
| `name`  | `string` | **Required**. |
| `price` | `float`  | **Required**. |
| `size`  | `string` | **Required**. |
| `image` | `string` | **Optional**. |

#### Remove car

```http
  DELETE /v1/cars/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Login

```http
  POST /v1/auth/login
```

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Register

```http
  POST /v1/auth/register
```

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `name`     | `string` | **Required**. |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Check profile

```http
  GET /v1/auth/whoami
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `-`       | `-`  | -           |

## 🚀 About Us

We are students and full stack developer...
