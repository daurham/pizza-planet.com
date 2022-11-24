# pizza-planet.com
A customer &amp; management facing, full-stack app for a pizza restaurant.

## Locally Deploy
1. Clone down this repository
  ```
  npm git clone https://github.com/daurham/pizza-planet.com.git
  ```
2. Install the dependancies
  ```
  npm i
  ```
3. Make sure you have the required software installed:
   - [PostgreSQL]()
   - [Node]()
   - [Node Version Manager]()
4. Use Node version 18.17.0
```
nvm use 18.17.0
```
5. Using PostgreSQL, create a database named "pizzaplanet"
6. Rename the "example.env" file to ".env" and fill out the fields:
   1. PORT
   2. ENV_MODE
   3. HOST
   4. POSTGRESQL_USER
   5. POSTGRESQL_PASSWORD
7. Build the client bundle with Webpack:
```
npm run client-build
```
8. Start the server:
```
npm run server
```
9. Visit the application in browser:
```
http://localhost:3000
```

- Or whatever your `http://[HOST]:[PORT]` are.

---
## Locally Test
1. 