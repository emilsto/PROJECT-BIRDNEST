# Reaktor pre-assignment solution

## What is this?

This is a solution to the pre-assignment for the Reaktor summer 2023 internship. TLDR: The assignment was to create a web application that displays if drones are currently flying over a given location. Longer version: http://assignments.reaktor.com/birdnest/

## Aproach to the problem

In a nutshell, my aproach is to create my own API that scrapes the data from the given API and then posts the data my own MongoDB that holds the data for a given time, 10 minutes in this case. This way I can store data about trespassing drones and display it to the user instantly on load. 

## Technologies used

## Deployment

### Backend
- Node.js
- Typescript
- Express
- mongoDB
- MongoDB atlas
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
- [X] API caches it for ~10 minutes per drone
- [X] API checks what drones have been flying over a given location in the last 10 minutes and sends them in a single response
- [X] Create a backend method that sends the user info of a drone that has violated the airspace
- [X] Create a frontend that displays the data in a nice way
- [X] Deploy the application to a server

## How to run the project

1. Clone the repository
2. cd to backend and run `npm install` and then `npm run dev`
3. cd to frontend and run `npm install` and then `npm start`
4. Go to localhost:3000 and enjoy the application. Additonally you can go to localhost:4000/api/drones/trespassers to see the data that the backend is sending to the frontend

##  Images

Here are some images of the application. The first one is the list of drones that have been flying over the given location in the last 10 minutes. The second one is a map that shows the latest trespassing location of the drone. NDZ stands for No Drone Zone, and it shows the 100m radius around the given location. (aka the nest)

![Alt text](/screenshots/dronelist.png "Visualizor")
![Alt text](/screenshots/visualizor.png?raw=true "Visualizor")
![Alt text](/screenshots/dronelist.png "Visualizor")
