import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes/IndexRoutes";
import { conn } from "./db/connection";
import { ApiError } from "./errors/ApiError";
import cors from "cors";
import { FillDataBase } from "./config/fillDb";


const app = express();
//Config json response
app.use(express.json());

app.use(cors());

//Usando as rotas
app.use(router);
app.use((error, request: Request, response: Response, next: NextFunction) => {

  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server error => ${error.message}`
  });
});

conn.sync({force:true}).then(async () => {
  //await FillDataBase.fillClients();
   //await FillDataBase.fillPromoters();
   //await FillDataBase.fillEvents();
  app.listen(process.env.PORT_DEV, () => console.log("Server on! Porta => 3333"));
}).catch((error) => console.log(error));


