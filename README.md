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
        - registration .post body:
            ```
            {
                "firstname": "user",
                "surname": "for_test",
                "lastname": "",
                "email": "user@email.com",   // required
                "password": "user"           // required
            }
            ```
        - login .post body:
        ```
        {
            "email": "user@email.com", // required
            "password": "user"         // required
        }
        ```
        - logout .post
        - refresh .get (automaticly use refreshToken from cookies)
        - update .put body:
        ```
        {
            "email": "test@email.com",       // required
            "password": "user",              // required
            "newEmail": "updated@email.com"
            "newPassword": "updatedPassword"
        }
        ```
    - products
        - .get
        - /:id .get
    - user (allowed for role user by acces bearer token in headers)
        - cart
            - .post body:
            ```
            {
                "cart_details":            // required
                [
                    {
                        "product_id": 1,   // required
                        "quantity": 7      // required
                    },
                    {
                        "product_id": 3,
                        "quantity": 10
                    }
                ]
            }
            ```
            - .get
            - .put body:
            ```
            {
                "cart_details":            // required
                [
                    {
                        "product_id": 1,   // required
                        "quantity": 7      // required
                    },
                    {
                        "product_id": 3,
                        "quantity": 10
                    }
                ]
            }
            ```
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
