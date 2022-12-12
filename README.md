# pizza-planet.com
A customer &amp; management facing, full-stack app for a pizza restaurant.

## Exploring The Deployed App:
1. Navigate to [Homepage](http://54.242.125.160:3000/)
2. Select login in the top right corner.
3. Make an account or log into one I made:
   1. Role: Owner
      1. email: jini@gmail.com
      2. password: '1234'
   2. Role: Chef
      1. email: jake@gmail.com
      2. password: '1234'
   3. Role: Customer
      1. email: corey@gmail.com
      2. password: '1234'
4. As a member of the staff, navigate the pizza manager and create Pizzas / add new toppings.

## Locally Deploy:
1. Clone down this repository
  ```
  npm git clone https://github.com/daurham/pizza-planet.com.git
  ```
2. Install the dependancies
  ```
  npm i
  ```
3. Make sure you have the required software installed:
   - [PostgreSQL](https://www.postgresql.org/download/)
   - Node
      ``` sh
      # node:
      curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash
      sudo apt-get install -y nodejs
      sudo apt-get install gcc g++ make
      ```
   - Node Version Manager
      ```sh
      # nvm:
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash 
      ```
4. Use Node version 18.17.0* (May work without)
```
nvm use 18.17.0
```
1. Using PostgreSQL, create a database named "pizzaplanet"
2. Rename the "example.env" file to ".env" and fill out the fields:
   1. PORT
   2. ENV_MODE
   3. HOST
   4. POSTGRESQL_USER
   5. POSTGRESQL_PASSWORD
3. Establing a connection to the databse by running:
```
npx prisma migrate -dev
```
1. Build the client bundle with Webpack:
```
npm run client-build
```
1. Start the server:
```
npm run server
```
1.   Visit the application in browser:
```
http://localhost:3000
```

- Or whatever your `http://[HOST]:[PORT]` are.

---
## Locally Test:
1. After setting up to deploy locally, start testing:
```
npm run test
```


## Next Steps:
- [ ] Create more tests
- [ ] Implement Auth0
- [ ] Implement Zustand / remove redux
- [ ] If no photo is added, provide a default pizza pic
- [ ] fix pizza sizing
- [ ] fix instructions drop down sizing