import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes/IndexRoutes";
import { conn } from "./db/Connection";
import { ApiError } from "./errors/api.errors";
import cors from "cors";


    const app = express();
    //Config json response
    app.use(express.json());

    app.use(cors());

    //Usando as rotas
    app.use(router);
    app.use((error, request: Request, response: Response, next: NextFunction) => {
        
      if(error instanceof ApiError){
        return response.status(error.statusCode).json({message: error.message});
      }
      return response.status(500).json({
        status: "error", 
        message: `Internal server error => ${error.message}`});
    });

    conn.sync().then(()=>{
        app.listen(3333, ()=> console.log("Server on! Porta => 3333"));
    }). catch((error) => console.log(error));
