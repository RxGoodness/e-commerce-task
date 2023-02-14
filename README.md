# e-commerce-task
### SETUP

1. Run `yarn` - to initialize the dependencies
2. `yarn build` - to transpile to js lib/app
3. `yarn start` - to start the server
4. create an `.env` file at the root of server folder - add the necessary credentials.

## FOLDER STRUCTURE

1. e-commerce task uses an MVC model with three additional folders for `endpoints, utils, and config`

### CREDENTIALS

1. e-commerce task mongoDB credentials can also be provided for constant tracking of `write/read` files with CRUD operations

TASK DESCRIPTION
************************************************************************

Use Joi validation, use jwt authentication and bycrypt for password hashing.
Use a global error handler


Using Nodejs, Typescript, Express and MongoDB, build a simple ecommerce API with the following features:
There is a user signup and user login.
1. Create, get all (include pagination on this) and get single product. This endpoint is not protected and there's an unrestricted access to view one or all products
2. Update product, only logged in user used be able to update his/her product
3. Delete product, only logged in user used be able to delete his/her product
4. Simple pagination on the get-all-product (multiple product) endpoint.

