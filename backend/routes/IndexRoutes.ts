import { Router } from "express";
import { clientRoutes } from "./ClientRoutes";

const router = Router();

router.use('/user', clientRoutes);

export {router};