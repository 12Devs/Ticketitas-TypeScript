import axios from "axios";

const api = axios.create({
  baseURL: "http://ticketitas-api-deploy-production.up.railway.app",
});

export {api};