# Backend

This repository is a backend of Yudha17/test-app-frontend repository

First Step 
-> Make sure that you should install MySql (in my environment I am using XAMPP Server)

Second Step 
-> Download this repository to your local development environment

Third Step
-> If the repository is ready in your local development environment, please open database folder then setup.js

Fourth Step
-> Try to change name of database you want to create, username of MySql, and password of MySql
   (Compare with this official site to modify those 3 of parameters -> https://sequelize.org/docs/v6/getting-started/ )

Fifth Step
-> Please open index.js and try to look line of 33 which is /*users.sync();*/

Sixth Step
-> Delete '/*' and '*/' then the syntax will be users.sync();

Seventh Step
-> Open terminal in your local development environment, and type node index.js. It will run your whole backend code

Eighth Step
-> If the code have run, try to look line of 33 which is users.sync();, then put back '/*' and '*/' in same as before. So the syntax will be /*users.sync();*/
   ( users.sync(); syntax will create programmatically to your localhost MySql then create database based on Fourth Step
   
Nineth Step
-> Please to continue to try to download Yudha17/test-app-frontend repository for Frontend Code 
