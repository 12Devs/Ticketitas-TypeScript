import { Router } from "express";
import { clientRoutes } from "./ClientRoutes";
import { eventRoutes } from "./EventRoutes";

const router = Router();

router.use('/user', clientRoutes);
router.use('/event', eventRoutes);

export {router};