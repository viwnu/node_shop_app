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

- /api
    - /auth
        <details><summary>/registration</summary>
        <blockquote>
        method: POST
        body:

        ```
        {
            "firstname": "user",
            "surname": "for_test",
            "lastname": "",
            "email": "user@email.com",   // required
            "password": "user"           // required
        }
        ```
        </blockquote>
        </details>

        <details><summary>/login</summary>
        <blockquote>
        method: POST

        body:
        ```
        {
            "email": "user@email.com", // required
            "password": "user"         // required
        }
        ```
        </blockquote>
        </details>

        <details><summary>/logout</summary>
        <blockquote>
        method: POST
        </blockquote>
        </details>

        <details><summary>/refresh</summary>
        <blockquote>
        method: GET (automaticly using refreshToken from cookies)
        </blockquote>
        </details>

        <details><summary>/update</summary>
        <blockquote>
        method: PUT
        body:

        ```
        {
            "email": "test@email.com",       // required
            "password": "user",              // required
            "newEmail": "updated@email.com"
            "newPassword": "updatedPassword"
        }
        ```
        </blockquote>
        </details>
    - /products
        <details><summary>/ method: GET</summary></details>
        <details><summary>/:id</summary>
        <blockquote>
        method: GET
        </blockquote>
        </details>
    - /user (allowed for role user by acces bearer token in headers)
        <details><summary>/cart</summary>
        <blockquote>
        <details><summary>/ method: POST</summary>
        <blockquote>
        body:

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
        </blockquote>
        </details>
        
        <details><summary>/ method: GET</summary></details>

        <details><summary>/ method: PUT</summary>
        <blockquote>
            body:

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
        </blockquote>
        </details>

        <details><summary>/ method: DELETE</summary></details>

        </blockquote>
        </details>

        <details><summary>/orders</summary>
        <blockquote>
        <details><summary>/ method: POST</summary>
        <blockquote>
        body: not need
        </blockquote>
        </details>
        <details><summary>/ method: GET</summary></details>
        </blockquote>

        </details>
    - /admin (allowed for role admin by acces bearer token in headers)
        <details><summary>/users</summary>
        <blockquote>
        <details><summary>/ method: GET</summary></details>
        <details><summary>/ method: PUT</summary>
        <blockquote>
        body: 

        ```
        {
            "user_id": 2,
            "firstName": "super",
            "surName": "puper",
            "lastName": "test",
            "email": "test1@email.com",
            "user_role": "USER"
        }
        ```
        </blockquote>
        </details>
        <details><summary>/:user_id</summary>
        <blockquote>
        <details><summary>/ method: GET</summary></details>
        <details><summary>/ method: DELETE</summary></details>
        </blockquote>
        </details>
        

        </blockquote>
        </details>

        <details><summary>/products</summary>
        <blockquote>
        <details><summary>/ method: POST</summary>
        <blockquote>
        body: 

        ```
        [{
            "product_name": "TV",
            "manufacture": "Sony",
            "category": "electronics",
            "price": "125",
            "description": "full hd 4k android TV"
        },
        {
            "product_name": "TV",
            "manufacture": "Sony",
            "category": "electronics",
            "price": "125",
            "description": "full hd 4k android TV"
        }]
        ```
        </blockquote>
        </details>

        <details><summary>/ method: GET</summary></details>

        <details><summary>/ method: PUT</summary>
        <blockquote>
        body:

        ```
        {
            "product_id": 1,
            "product_name": "refrijerator",
            "manufacture": "SAMSUNG",
            "category": "citchen",
            "price": 12,
            "description": "very cold"
        }
        ```
        </blockquote>
        </details>

        <details><summary>/:id</summary>
        <blockquote>
        <details><summary>/ method: GET</summary></details>

        <details><summary>/ method: DELETE</summary></details>
        </blockquote>
        </details>

        </blockquote>
        </details>

        <details><summary>/orders</summary>
        <blockquote>
        <details><summary>/ method: GET</summary></details>
        <details><summary>/ method: PUT</summary>
        body:

        ```
        {
            "order_id": 1,
            "order_details": [
                {
                    "product_id": 1,
                    "quantity": 700
                },
                {
                    "product_id": 3,
                    "quantity": 1000
                }
            ]
        }
        ```
        </details>
        <details><summary>/user/:user_id</summary>
        <blockquote>
        <details><summary>/ method: GET</summary></details>
        </blockquote>
        </details>
        <details><summary>/:order_id</summary>
        <blockquote>
        <details><summary>/ method: DELETE</summary></details>
        </blockquote>
        </details>
        </blockquote>
        </details>
