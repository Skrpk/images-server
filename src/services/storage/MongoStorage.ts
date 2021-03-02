import config from 'config';
import { MongoClient, Collection } from 'mongodb';

import IStorageService from './IStorateService';
import IImageData from '../dataSource/IImageData';

const mongoHost: string = config.get('MONGO_HOST');
const mongoPort: number = config.get('MONGO_PORT');

const generateConnectionString = (): string =>
  `mongodb://${mongoHost}:${mongoPort}`

class MongoStorage implements IStorageService {
  private imagesCollection: Collection<IImageData>;

  initialize() {
    return MongoClient.connect(generateConnectionString())
      .then((client: MongoClient) => {
        const db = client.db('ImagesDB');

        this.imagesCollection = db.collection<IImageData>('images');
      })
      .catch(err => {
        throw new Error(`Failed to connect to MongoDB: ${err}`)
      })
  }

  addImageData(imageData: IImageData) {
    this.imagesCollection.insertOne(imageData);
  }

  getAllImagesData(): Promise<IImageData[]> {
    return this.imagesCollection.find().toArray();
  }

  clearData() {
    this.imagesCollection.remove({})
  }
}

export default MongoStorage;
