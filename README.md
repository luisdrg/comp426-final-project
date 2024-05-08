# COMP426 - Final Project

## Overview
This application provides an API for managing user data and notes, built with Express.js and Firebase. It allows operations such as adding, retrieving, updating, and deleting users and their notes. A unique feature of this application is the capability for users to include a mood indicator with each note, allowing for an enhanced personal documentation experience. Additionally, it includes endpoints to fetch random dog facts and images from external APIs.

## Features
* **User Management**: Create, read, update, and delete users in the database.
* **Note Management**: Each user can add, update, retrieve, and delete personal notes with a title, note content, and mood indicator.
* **External Data Access**: Fetch random dog facts and dog pictures from third-party APIs.

## Technologies Used
* **Node.js and Express.js**: Server-side framework
* **Firebase**: Used for database operations, authentication, and configuration.
* **Axios**: For making HTTP requests to third-party APIs.

## Getting Started
1. Install dependencies in both the frontend and backend: *npm install*
2. Run the backend: *cd ./backend* and *node app.mjs*
3. Run the frontend: *cd ./frontend* and *npm start*

## API Endpoints
### User Operations
#### Retrieve all users
    GET /users
On success, returns a JSON array of all user objects. Generates a 500 response if there is an internal server error.

#### Retrieve user by id
    GET /users/:id
On success, returns a JSON object for the user with id equal to {id}. Generates a 404 response if no user with that id is available. Generates a 400 response if id is non-numeric or negative. The returned JSON representation of the node includes fields id, lastName, phoneNumber, email, birthdate, firstName, pet, and gender.
Example:

    {
        "id": "UykObc6pt5eZTK0Z7VPBNcqDNKy1",
        "lastName": "James",
        "phoneNumber": "9198786543",
        "email": "ljames@yahoo.com",
        "birthdate": "1985-02-12",
        "firstName": "LeBron ",
        "pet": "not cat",
        "gender": "male"
    }

#### Create new user
    POST /users
On success, returns the newly created user object as a JSON object. Generates a 400 response if the input data is invalid.

#### Update user
    PUT /users/:id
On success, returns a JSON object for the updated user with id equal to {id}. Generates a 404 response if no user with that id is available. Generates a 400 response if id is non-numeric or negative.

#### Delete user
    DELETE /users/:id
On success, returns a success message indicating the user was deleted. Generates a 404 response if no user with that id is available. Generates a 400 response if id is non-numeric or negative.

### Note Operations
#### Create new note for a specific user
    POST /api/users/:userId/notes
On success, returns a JSON object of the newly created note including fields id, title, note, mood. Generates a 400 response if the user userId is non-numeric or negative.

#### Retrieve all notes for a specific user
    GET /api/users/:userId/notes
On success, returns a JSON array of all notes for the specified user. Generates a 404 response if no notes available for the user. Generates a 400 response if userId is non-numeric or negative.
Example:

    [
        {
            "id": "UiNW6mfBpQsNVGUpmX4P",
            "title": "sadsad",
            "note": "sadas",
            "mood": "good",
            "dateCreated": "5/7/2024, 7:46:27 PM"
        },
        {
            "id": "ehJQbnvnv2ZXMku1BRt6",
            "title": "sdsad",
            "note": "sadsadsad",
            "mood": "good",
            "dateCreated": "5/7/2024, 7:47:10 PM"
        }
    ]

#### Update a note by id for a specific user
    PUT /api/users/:userId/notes/:noteId
On success, returns a JSON object for the updated note with id equal to {noteId}. Generates a 404 response if no note with that noteId is available. Generates a 400 response if noteId is non-numeric or negative.

#### Delete a note by id for a specific user
    DELETE /api/users/:userId/notes/:noteId
On success, returns a success message indicating the note was deleted. Generates a 404 response if no note with that noteId is available. Generates a 400 response if noteId is non-numeric or negative.

### External APIs
    GET /api/facts
On success, returns a JSON object containing a random dog fact. Generates a 500 response if there is an error fetching the data.

    GET /api/pics
On success, returns a JSON object containing a random dog image. Generates a 500 response if there is an error fetching the image.