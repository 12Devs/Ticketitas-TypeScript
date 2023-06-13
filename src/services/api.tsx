import axios from "axios";

// http://localhost:3333
// https://ticketitas-api-deploy-production.up.railway.app

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export {api};