# Backend

-----> Please to download and install Node JS <-----
(Try to look https://nodejs.dev/en/learn/how-to-install-nodejs/ or other way of documentation)

-----> Please to download and install all dependencies <-----
(Try to look Yudha17/Backend/package.json to search all dependencies needed)

-----> Make sure in your local development environment you divide which is terminal for Backend and terminal for Frontend <-----


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
-> Please open index.js and try to look line of 33 which is /*users.sync();*/ (backslash symbols and multiple symbols)

Sixth Step
-> Delete '/*' and '*/' then the syntax will be users.sync(); (backslash symbols and multiple symbols)

Seventh Step
-> Open terminal in your local development environment, and type 'node index.js' in your backend terminal. It will run your whole backend code

Eighth Step
-> If the code have run, try to look line of 33 which is users.sync();, then put back '/*' and '*/' (backslash symbols and multiple symbols) in same as before. So the syntax will be /*users.sync();*/ (backslash symbols and multiple symbols)
   ( users.sync(); syntax will create programmatically to your localhost MySql then create database based on Fourth Step )
   
Nineth Step
-> Please to continue to try to download Yudha17/test-app-frontend repository for Frontend Code 


