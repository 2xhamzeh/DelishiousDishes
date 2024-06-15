## Server Setup

The server for this project is built with Express.js and uses MongoDB as the database.

### Starting the Server

1. Open your terminal.
2. Navigate to the project directory using the `cd` command.
3. Once you're in the project directory, navigate to the server directory: `cd server`
4. Start the server by running the command: `node main`

You should see a message saying "Connected to MongoDB!" This means the server has started successfully and is connected to the database.

### Viewing the Database

You can view the database using MongoDB Compass. To do this, connect MongoDB Compass to your MongoDB server and select the database ('dish_db') for this project.

### Populating the Database

You can populate the database by running the `node seed` command in the server directory. This will fill the database with initial data for testing and development purposes.