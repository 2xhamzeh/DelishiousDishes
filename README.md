# AgileWebDevProject

Project for our Web Technology: Agile Web Development course at university.
Marwa
Truc
Hamzeh


## Starting the Server

To start the server, follow these steps:

1. Open your terminal.
2. Navigate to the project directory using the `cd` command.
3. Once you're in the project directory, navigate to the server directory: `cd server`
4. Start the server by running the command: `node main`


## Starting the Client

To start the client, follow these steps:

1. Open your terminal.
2. Navigate to the project directory using the `cd` command.
3. Once you're in the project directory, navigate to the client directory: `cd client`
4. Install the necessary packages by running the command: `npm install`
5. After the installation is complete, start the client by running the command: `npm run dev`

You should see a message saying "VITE v5.2.11 ready in 2494 ms" and a local URL. This means the client has started successfully and is running on your local machine.

## Using Docker

1. Open your terminal.
2. Navigate to the client directory: `cd client`
3. Ensure that the React app is correctly built before building the Docker images and starting the Docker containers:   `npm run build`

>>>
This isn't really necessary anymore since docker-compose will handle it. 
4. Copy the new 'client/dist' folder in the server folder
>>>

5. Navigate to the project root directory using the `cd ..` command.

Note: the `docker-compose` command is used to mange multi-container applications
6. Build the docker client and server images with `docker-compose build`
7. Start the Docker Container with `docker-compose up`

8. The application is accessible at port 4000. You can visit the delishious dishes website at <localhost:4000>