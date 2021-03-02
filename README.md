# images-server

This is a node.js app which is used for caching images data from
third-party API.
It uses MongoDB for storing cached data.
To run this app navigate to project folder from terminal and run

`docker-compose up --build`

The app should be accessible on port `3000`.

<b>Note:<b/> if you get 126 error on UNIX system when running docker container then
you need to go to permission settings of start.sh file and allow
executing it as program.