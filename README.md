# Welcome to My Movie Api Client
A web app that allows users to register, login, and search a collection of movies, add to their personal favorite list and update their registered profile. 

## Tech Stack
My Movie App is a Full Stack App built Via MERN (MongoDB, Express, React, Node) on the REST Architecture implementing RESTful API. 

## Additional Tech implemented
- Front End: Deployed via Netlify
    React Libraries:
    - React Bootstrap
    - React Router Dom
    - React Icons
    - Prop Types
    - React Cool On Click Outside

- Backend: Deployed via Render
    - Mongoose (ODM - Object Data Modeling)
    - Body Parser
    - Lodash


    Authentication: 
    - JWT (Json Web Tokens)
    - Passport
    - Cors
    - Bcrypt

    Middleware: 
    - Morgan (For Logging)  

## Features
- User Authentication
- Registration: Users can sign up
- Login
- Search Bar 
- Add to Favorites
- Update Profile
- Delete Profile
- Logout
- View list of movies
- View Movie Details
- View Embedded Movie Trailers
- Responsive Navigation Bar 

## Link to Live Site: https://mustcmovies.netlify.app
## Movie-Api Server Side Repository 
https://github.com/timone019/movie_api.git

## Environment Configuration

This client now reads the backend URL from `process.env.API_BASE_URL` (wired up via `src/config.js`).

### Local development
1. Create a `.env` file in the project root (same level as `package.json`).
2. Add the line:
   ```
   API_BASE_URL=https://move-api-kw8t.onrender.com
   ```
3. Run `npm start` (Parcel picks up the variable automatically). Change the value when pointing to another backend.

### Netlify / Production
1. Netlify Dashboard → Site settings → **Build & deploy → Environment**.
2. Click **Add variable**, set `API_BASE_URL` to your Render URL, keep the scopes/value defaults.
3. Save and trigger **Deploy site** so Parcel embeds the new value.

## Setup Instructions

1. Clone the repository:

   ```zsh
   git clone https://github.com/timone019/movie_api-client.git
   
   
2. Install dependencies in root project folder:

`npm install`

3. Start the development server:

`npm start`

4. Open the app in your browser: http://localhost:4321

