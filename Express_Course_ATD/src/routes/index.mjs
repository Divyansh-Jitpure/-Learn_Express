import { Router } from "express";
import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";
import qotesAPIRouter from "./quotesAPI.mjs";

const router = Router();

router.use(usersRouter);
router.use(productsRouter);
router.use(qotesAPIRouter);

export default router;