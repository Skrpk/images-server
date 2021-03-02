import { Router } from 'express';

const imagesRouter = Router();

import controllers from '../controllers';

const { ImagesController } = controllers;

imagesRouter.get('/search/:searchTerm', ImagesController.searchImages);

export default imagesRouter;
