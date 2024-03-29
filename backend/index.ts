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

conn.sync().then(async () => {
  //  await FillDataBase.fillClients();
  //  await FillDataBase.fillPromoters();
  //  await FillDataBase.fillSuperAdministrator();
  //  await FillDataBase.fillEvents();
  app.listen(process.env.PORT_BACK, () => console.log("Server on! Porta => 3333"));
}).catch((error) => console.log(error));


