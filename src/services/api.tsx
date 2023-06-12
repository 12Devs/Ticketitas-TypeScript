import axios from "axios";

const api = axios.create({
  baseURL: "https://ticketitas-api-deploy-production.up.railway.app",
});

export {api};