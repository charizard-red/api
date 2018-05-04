# Temu Dokter API

* Development: http://localhost:8000
* Production: http://temudokter-api.herokuapp.com

## Development

```sh
npm install
```

```sh
npm start
```

## API Endpoints

| HTTP   | Routes         | Description                     |
| ------ | -------------- | ------------------------------- |
| GET    | `/`            | ...                             |
| GET    | `/auth/google` | authenticate person with google |
| GET    | `/clinics`     | get all clinic                  |
| POST   | `/clinics`     | add a clinic                    |
| GET    | `/clinics/:id` | get a clinic                    |
| DELETE | `/clinics/:id` | delete a clinic                 |
| PUT    | `/clinics/:id` | update a clinic                 |
| GET    | `/orders`      | get all orders                  |
| POST   | `/orders`      | add an order                    |
| DELETE | `/orders/:id`  | delete an order                 |
| PUT    | `/orders/:id`  | update an order                 |
| GET    | `/doctors`     | get all doctors                 |
| POST   | `/doctors`     | add a doctor                    |
| DELETE | `/doctors/:id` | delete a doctor                 |
| PUT    | `/doctors/:id` | update a doctor                 |
