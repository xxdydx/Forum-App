# Forum App

A simple forum app. This is my first foray into full-stack web development using the MERN stack, as part of my full stack course, FullStackOpen. By the way, it's such a great course for anybody who knows the basics of HTML, CSS and JavaScript.

## Features

- CRUD functionality of posts (both frontend and backend)
- Like and comment functionality
- User authentication using JSON Web Token
- Clean and usable UI

## Stack and Frameworks used

### Frontend

<img src="https://www.svgrepo.com/show/354259/react.svg"  width="40px" alt="ReactJS"> <img src="https://www.svgrepo.com/show/354274/redux.svg"  width="40px" alt="Redux"> <img src="https://www.svgrepo.com/show/354262/react-router.svg"  width="40px" alt="React-Router"> <img src="https://www.svgrepo.com/show/374118/tailwind.svg"  width="40px" alt="Tailwind CSS">

### Backend

<img src="https://www.svgrepo.com/show/354118/nodejs.svg" class="ml-2" width="40px" alt="NodeJS"> <img src="https://www.svgrepo.com/show/373845/mongo.svg" class="ml-2" width="40px" alt="MongoDB">

### Testing

<img src="https://cdn.freebiesupply.com/logos/large/2x/jest-logo-svg-vector.svg" class="ml-2" width="40px" alt="Jest"> <img src="https://miro.medium.com/max/364/0*JAWNOBEDxJLXxHUj.png" class="ml-2" width="40px" alt="Cypress">

## Screenshots

<img src='https://raw.githubusercontent.com/xxdydx/forum-app/main/images/blogList.png' width='800' height='467'>
<img src= 'https://raw.githubusercontent.com/xxdydx/forum-app/main/images/blogView.png' width='800' height='467'>
<img src= 'https://raw.githubusercontent.com/xxdydx/forum-app/main/images/commenting.png' width='800' height='436'>
<img src= 'https://raw.githubusercontent.com/xxdydx/forum-app/main/images/createPost.png' width='800'>

## Installing this project locally
It's an easy process. 
1. Install NodeJS and the NPM package manager.
2. Get your own MongoDB database (you can get one for free at MongoDB Atlas or you can set up one locally)
3. Clone this git repository
4. `cd back`
5. Set your MongoDB database link and port (3003 by default) variables under the .env file
6. `npm install`
7. `npm start`

There you go! Hopefully I find time to make a Dockerfile for this lol.


## Upcoming Features

- Fix up some user interfaces (I have trouble with CSS :/)
- Dockerfile and automated CI/CD
- Markdown support for posts
- Abilty to like and unlike posts (user-unique likes, it's currently anonymous now)
- Nested commenting features (quite lazy to do tbh)
- Better and more secure user authentication
