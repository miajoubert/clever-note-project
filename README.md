#Clevernote

## Getting Started
1. Clone repository:
  * git clone git@github.com:miajoubert/clevernote-project.git

2. Install dependencies from root directory:
  * npm install

3. Create Postgresql user with "createdb" and "password" in PSQL:
  * CREATE USER clevernote_app with CREATEDB PASSWORD 'your password here';

4. Create an .env file in backend directory based on .env.example.
5. Enter your username and password to the .env file along with database name, secure JWT_SECRET, and port number (preferred 5000).
6. Add a proxy to end of package.json file in frontend directory, matching your .env file port number:
  * "proxy": "http://localhost:5000"
 
7. Create database, migrate models, seed models:
  * npx dotenv sequelize db:create
  * npx dotenv sequelize db:migrate
  * npx dotenv sequelize db:seed:all
 
8. Start backend services:
  * npm start
 
9. Start frontend services; if this does not automatically open in browser, navigate to http://localhost:3000
  * npm start

11. Create an account or use Demo login to access Clevernote.


## Features
### Notebooks
A logged in user will have an automatic new notebook upon signup; new notebooks can be added, referenced, edited, or deleted.

### Notes
A logged in user can create notes in their notebooks to be referenced at any time. These can be edited and deleted.
