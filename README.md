## Shop App

**This is task of nodejs intensive from Lad Company, Nizhny Novgorod**


**to install dependencies:**
```
    npm i
```

## DataBase

**Requred constans**(in .env file)
```
    PS_PASSWORD
    PORT
    JWT_ACCESS_SECRET
    JWT_REFRESH_SECRET
```
*(you need create .env file and pass your values to constants given above)*

**Dumpfile** to create database given in queries in *src/dumpfile.sql*

## npm commands:
```
    npm run dev // - start nodemon
    npm build // - build to ./build directory
```

## Endpoints

- api
    - auth
        - registration body:
            ```
            {
                "firstname": "admin",
                "surname": "for_test",
                "lastname": "",
                "email": "admin@email.com",   // required
                "password": "admin"           // required
            }
            ```
        - login
        - logout
        - refresh
        - update
    - products
    - user (allowed for role user by acces bearer token in headers)
        - cart
            - .post
            - .get
            - .put
            - .delete
        - orders
            - .post
            - .get
    - admin (allowed for role admin by acces bearer token in headers)
        - users
            - .get
            - /:user_id .get
            - .put
            - /:user_id .delete
        - products
            - .post
            - .get
            - /:user_id .get
            - .put
            - /:user_id .delete
        - orders
            - .get
            - /user/:user_id .get
            - .put
            - /:order_id . delete
