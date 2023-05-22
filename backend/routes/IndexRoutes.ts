import { Router } from "express";
import { administratorRoutes } from "./AdministratorRoutes";
import { clientRoutes } from "./ClientRoutes";
import { eventRoutes } from "./EventRoutes";
import { enderecoRoutes } from "./EnderecoRoutes";
import { promoterRoutes } from './PromoterRoutes'
import { saleRoutes } from "./SaleRoutes";
import { highlightsRoutes } from "./HighlightsRoutes";

const router = Router();

router.use('/user', administratorRoutes);
router.use('/user', clientRoutes);
router.use('/user', promoterRoutes);
router.use('/event', eventRoutes);
router.use('/endereco', enderecoRoutes);
router.use('/sale', saleRoutes);
router.use('/highlights', highlightsRoutes);

export {router};