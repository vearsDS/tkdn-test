# tkdn-test
For TKDN test purpose

#1 Setting up database :
Create database with name tkdn_costumer;
Create types enum (female, and male) -> This is for database column type gender;
Create table with table name costumers;
---------(all the query on the costumer.sql file)-------
Change database setup on ./settings/db.js (change all the requirement that meet your env)

2# Setting up BE server : 
Make sure you already have Nodejs install on your computer;
run npm i;

3# Run the server : 
Run npm run prod -> Production;
Run npm run dev -> Development;

4# Route :
localhost:3000/api/costumer -> Create Customer
localhost:3000/api/costumer -> Get All Costumer
localhost:3000/api/costumer/:costumerId -> Get Detail Costumer
localhost:3000/api/costumer/update/:costumerId -> Update Costumer
localhost:3000/api/costumer/delete/:costumerId -> Delete Costumer

#TECH STACK :
- Database -> PostgreSQL;
- Framework -> ExpressJS;
- Runtime -> NodeJS;
- Language -> JavaScript;