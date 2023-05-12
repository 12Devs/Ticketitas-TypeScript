import { Router } from "express";
import { clientRoutes } from "./ClientRoutes";
import { administratorRoutes } from "./AdministratorRoutes";

const router = Router();

router.use('/user', clientRoutes);
router.use('/user', administratorRoutes);

export {router};