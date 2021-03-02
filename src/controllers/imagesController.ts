import { Request, Response,  } from 'express';
import Services from '../services';

const { imagesService } = Services;

class ImagesController {
  async searchImages(req: Request, res: Response) {
    try {
      const result = await imagesService.searchImages(req.params.searchTerm);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export default ImagesController;
