import ImagesService from './images/imagesService';
import NodeScheduler from './scheduler/NodeScheduler';
import APIDataSource from './dataSource/APIDataSource';
import MongoStorage from './storage/MongoStorage';

const mongoStorage = new MongoStorage();
const scheduler = new NodeScheduler();
const apiDataSource = new APIDataSource(scheduler);

const imagesService = new ImagesService(
  apiDataSource,
  scheduler,
  mongoStorage
);

export default {
  imagesService
}
