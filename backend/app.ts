import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes/IndexRoutes";
import { ApiError } from "./errors/ApiError";
import cors from "cors";


const app = express();
//Config json response
app.use(express.json());

app.use(cors());

//Usando as rotas
app.use(router);
app.use((error: any, request: Request, response: Response, next: NextFunction) => {

  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server error => ${error.message}`
  });
});

export { app };