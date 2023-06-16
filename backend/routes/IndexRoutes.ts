//Import of the "Router" submodule of the "express" module
import { Router } from "express";

//Import of the routes for each system feature
import { administratorRoutes } from "./AdministratorRoutes";
import { clientRoutes } from "./ClientRoutes";
import { eventRoutes } from "./EventRoutes";
import { enderecoRoutes } from "./EnderecoRoutes";
import { promoterRoutes } from './PromoterRoutes'
import { saleRoutes } from "./SaleRoutes";
import { highlightsRoutes } from "./HighlightsRoutes";
import { testRoutes } from "./TestRoutes";

/**
 * Instance of the Router class/submodule for registering routes using the Router submodule of the express API/module
 */
const router = Router();

/**
 * Register the routes for each system feature
 */

router.use('/user', administratorRoutes);
router.use('/user', clientRoutes);
router.use('/user', promoterRoutes);
router.use('/event', eventRoutes);
router.use('/endereco', enderecoRoutes);
router.use('/sale', saleRoutes);
router.use('/highlights', highlightsRoutes);
router.use('/test', testRoutes);

export {router};