# Reaktor pre-assignment solution

## What is this?

This is a solution to the pre-assignment for the Reaktor summer 2023 internship. TLDR: The assignment was to create a web application that displays if drones are currently flying over a given location. Longer version: http://assignments.reaktor.com/birdnest/

## Aproach to the problem

In a nutshell, my aproach is to create my own API that scrapes the data from the given API and then caches it for a short period of time, 10 minutes in this case. 
This way I can store data about trespassing drones and display it to the user. 

## Technologies used

### Backend
- Node.js
- Typescript
- Express
- Axios
- XML2JS

### Frontend
- React
- Typescript
- Axios
- TailwindCSS

## Current state of the project

### Done
- [X] API that scrapes the data from the given API parses it to a nice JSON format from the given XML
- [X] API caches it for 10 minutes per drone
- [X] API checks what drones have been flying over a given location in the last 10 minutes and sends them in a single response
- [X] Create a frontend that displays the data in a nice way
- [X] Create a backend method that sends the user info of a drone that has violated the airspace

### ToDo
- [ ] Refactor the code, in necessary places, mainly the backend
- [ ] Do some testing
- [ ] Add a map to the frontend that shows the location of the drone
- [ ] Deploy the application to a server

## How to run the project

1. Clone the repository
2. cd to backend and run `npm install` and then `npm run dev`
3. cd to frontend and run `npm install` and then `npm start`
4. Go to localhost:3000 and enjoy the application. Additonally you can go to localhost:4000/api/drones/trespassers to see the data that the backend is sending to the frontend

