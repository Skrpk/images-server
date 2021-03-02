import config from 'config';

import IScheduler from '../scheduler/IScheduler';
import IDataSource from '../dataSource/IDataSource';
import IImageData from '../dataSource/IImageData';
import IStorateService from '../storage/IStorateService';

class ImagesService {
  constructor(
    private dataSource: IDataSource,
    private scheduler: IScheduler,
    private storage: IStorateService,
  ) {
    this.storage.initialize()
      .then(() => this.dataSource.initialize())
      .then(() => {
        this.refreshCacheData();
        this.scheduler.schedule(config.get('CACHE_REFRESH_TIMEOUT'), this.refreshCacheData);
      })
  }

  private refreshCacheData = () => {
    console.log('REFRESHING CACHE DATA...');
    this.storage.clearData();
    this.dataSource.getImagesInfo(this.storage.addImageData.bind(this.storage));
  }

  async searchImages(searchTerm: string): Promise<IImageData[]> {
    const imagesData = await this.storage.getAllImagesData();
    return imagesData.filter((data: IImageData) => {
      const searchString = Object.values(data).join('|').toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
  }
}

export default ImagesService;
