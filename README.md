##NodeJS base REST API WITH CRUD OPERATION TO WORK WITH FOR BEGINNERS. 


###RESTful API TO WORK FOR BEGINNERS USING 
    * MONGODB
    * MONGOOSE
    * EXPRESS
    * MORGAN
    * BODY PARSER
    * CONFIG.

* TO RUN THE APPLICATION.

    * Install Mongodb from it's official website. create database using it's API.
        * [TO SETUP THE MONGODB!](https://www.tutorialspoint.com/mongodb/mongodb_environment.htm)
        * installed version : `mongodb-win32-x86_64-2008plus-ssl-3.6.0-signed`
        * use mongodb compass community tool to configure db.
        * Hostname : 127.0.0.1
        * port : 8536 
        * enter hostename and port and hit connect.
    
    * run ``npm install`` command from your root directory. 
        * It will create node_modules folder inside your directory.
        * Node should be installed for above command to run properly.
        
    * run below commands.
        * `md D:\MongoDB\db` - database path.
        * `mongod.exe --port 8536 --bind_ip 127.0.0.1 --noauth --dbpath D:\MongoDB\db` - start mongo instance.
        
    * Hit ``node server.js`` command from root directory to start the server.