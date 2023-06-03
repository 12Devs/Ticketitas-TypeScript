import { app } from "./backend/app";
import { FillDataBase } from "./backend/config/fillDb";
import { conn } from "./backend/db/connection";

conn.sync().then(async () => {
    //  await FillDataBase.fillClients();
    //  await FillDataBase.fillPromoters();
    //  await FillDataBase.fillSuperAdministrator();
    //  await FillDataBase.fillEvents();
    app.listen(process.env.PORT_BACK, () => console.log("Server on! Porta => 3333"));
  }).catch((error) => console.log(error));