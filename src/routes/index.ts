import { Router } from 'express';

const rootRouter = Router();

import ImagesRouter from './imagesRouter';

rootRouter.use('/', ImagesRouter);

export default rootRouter;
