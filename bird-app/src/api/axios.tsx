import axios from "axios";

const instance = axios.create({
  baseURL: "http://ec2-13-51-194-246.eu-north-1.compute.amazonaws.com:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
