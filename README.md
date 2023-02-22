## Tickitz-server

This is a ExpressJs-based API for [frontend project](https://github.com/stringifyy/Tickitz-FE). It uses PostgreSQL as its database

## Getting started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/ARRAY-4/backend.git`
* `cd backend`
* `npm install` to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `node index.js` to start the local server

## DB Structure

Open [schema](https://drawsql.app/teams/array/diagrams/copy-of-auth-db)

## Folder Structure

     ┣ 📂src
      ┃ ┣ 📂controller
      ┃ ┃ ┣ 📜cinema_controller.js
      ┃ ┃ ┣ 📜controller_auth.js
      ┃ ┃ ┣ 📜history_controller.js
      ┃ ┃ ┣ 📜movies_controller.js
      ┃ ┃ ┣ 📜seatsLeft_controller.js
      ┃ ┃ ┗ 📜seatsRight_controller.js
      ┃ ┣ 📂middleware
      ┃ ┃ ┣ 📜checkDuplicate.js
      ┃ ┃ ┣ 📜formUpload.js
      ┃ ┃ ┗ 📜validation.js
      ┃ ┣ 📂model
      ┃ ┃ ┣ 📜cinema_model.js
      ┃ ┃ ┣ 📜history_model.js
      ┃ ┃ ┣ 📜model_auth.js
      ┃ ┃ ┣ 📜movies_model.js
      ┃ ┃ ┣ 📜seatsLeft_model.js
      ┃ ┃ ┗ 📜seatsRight_model.js
      ┃ ┗ 📂route
      ┃ ┃ ┣ 📜route_auth.js
      ┃ ┃ ┣ 📜route_cinema.js
      ┃ ┃ ┣ 📜route_history.js
      ┃ ┃ ┣ 📜route_index.js
      ┃ ┃ ┣ 📜route_movies.js
      ┃ ┃ ┣ 📜route_seatsLeft.js
      ┃ ┃ ┗ 📜route_seatsRight.js
      ┣ 📜.env
      ┣ 📜.gitignore
      ┣ 📜README.md
      ┣ 📜index.js
      ┣ 📜package-lock.json
      ┗ 📜package.json
    
## Endpoints
users endpoint

    GET      /api/users
    GET      /api/users/:id
    PATCH    /api/users/:id
    DEL      /api/users/:id

portfolio endpoint

    GET      /api/users-portfolio
    GET      /api/users-portfolio/:id
    POST     /api/users-portfolio
    PATCH    /api/users-portfolio/:id
    DEL      /api/users-portfolio/:id
    
experiences endpoint

    GET      /api/users-experiences
    GET      /api/users-experiences/:id
    POST     /api/users-experiences
    PATCH    /api/users-experiences/:id
    DEL      /api/users-experiences/:id
    
user_skills endpoint

    GET      /api/users-skills
    GET      /api/users-skills/:id
    POST     /api/users-skills
    PATCH    /api/users-skills/:id
    DEL      /api/users-skills/:id

when put under a domain with `prefix`, it would look like:

    https://www.example.com/api/users
 
Documentation : [Postman Collection](https://documenter.getpostman.com/view/24646334/2s935kP673)
 
