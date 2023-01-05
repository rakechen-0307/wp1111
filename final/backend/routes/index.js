import { Router } from 'express';
import SongMakerRouter from './SongMaker.js';
import LoginRouter from "./LoginSystem";

const router = Router();

router.use('/', SongMakerRouter);
router.use("/loginapi", LoginRouter);

export default router;