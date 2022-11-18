# API Requirements
Company stakeholders want to create an online storefront to show some good product ideas. Users need to be able to browse a catalog of all products, see details of a single product, and add products to an order that they can view on the shopping cart page. You are tasked with building the API that will support this application, and your co-worker is building the front end.

## API endpoints

#####  Users
    1. http://localhost:6000/users/                     >> Index route (returns all users) [GET][TOKEN]
    2. http://localhost:6000/users/:id                  >> Show route (returns a specific user) [GET][TOKEN]
    3. http://localhost:6000/users/signup               >> Create route (creates a new user to get token first) [POST]
    4. http://localhost:6000/users/:id                  >> Delete route (deletes a specific user) [DELETE][TOKEN]

##### Orders
    1. http://localhost:6000/orders/                    >> Index route (returns all orders) [GET][TOKEN]
    2. http://localhost:6000/orders/:id                 >> Show route (returns a specific order) [GET][TOKEN]
    3. http://localhost:6000/orders/user/:id            >> Show user orders [GET][TOKEN]
    4. http://localhost:6000/orders                     >> Create route (creates a new order) [POST][TOKEN]
    5. http://localhost:6000/orders/:id/product         >> Create new product (creates a product in a specific order) [POST][TOKEN]
    6. http://localhost:6000/orders/:id                 >> Delete route (deletes a specific order) [DELETE][TOKEN]


#####  Products
    1. http://localhost:6000/products/                  >> Index route (returns all products) [GET]
    1. http://localhost:6000/products/:id               >> Show route (returns a specific product) [GET]
    3. http://localhost:6000/products/                  >> Create route (creates a new product) [POST][TOKEN]
    1. http://localhost:6000/products/:id               >> Delete route (deletes a specific product) [DELETE][TOKEN]
    1. http://localhost:6000/products/category/:name    >> Show product by category [GET]


### Database Schema
    - TABLES
        - users
            - columnName    - type
            - id            - int(PK)
            - first_name     - VARCHAR
            - last_name      - VARCHAR
            - password      - VARCHAR

        - products
            - columnName    - type
            - id            - int(PK)
            - category      - text
            - price         - int

        - orders
            - columnName    - type          - references
            - id            - int(PK)
            - user_id       - bigint        - users(id)

        - order_products
            - columnName    - type          - references
            - id            - int(PK)
            - order_id      - bigint        - orders(id)
            - product_id    - bigint        - products(id)
            - quantity      - int