import { Router } from "express";
import { clientRoutes } from "./ClientRoutes";
import { eventRoutes } from "./EventRoutes";
import { enderecoRoutes } from "./EnderecoRoutes";
import {promoterRoutes} from './PromoterRoutes'

const router = Router();

router.use('/user', clientRoutes);
router.use('/event', eventRoutes);
router.use('/endereco', enderecoRoutes);
router.use('/user', promoterRoutes);

export {router};