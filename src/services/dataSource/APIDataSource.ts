import axios, { AxiosPromise, AxiosResponse } from 'axios';
import config from 'config';

import IDataSource from './IDataSource';
import IImageData from './IImageData';
import IScheduler from '../scheduler/IScheduler'

interface IPictureInput {
  id: string;
  cropped_picture: string;
}

interface IImageResponse {
  pictures: IPictureInput[];
  page: number;
  pageCount: number;
  hasMore: boolean;
}

class APIDataSource implements IDataSource {
  private token: string;

  constructor(private scheduler: IScheduler) {
    this.scheduler.schedule(config.get('TOKEN_REFRESH_TIMEOUT'), this.refreshToken);
  }

  async initialize() {
    return this.refreshToken();
  }

  private async refreshToken() {
    try {
      const response = await axios({
        method: 'POST',
        url: config.get('AUTH_URL'),
        data: { apiKey: config.get('API_KEY') }
      });

      this.token = response.data.token;
      console.log('TOKEN REFRESHED...');
    } catch(err) {
      throw new Error(`Failed to refresh token: ${err}`);
    }
  }

  private queryPage = (page: number): AxiosPromise<IImageResponse> => axios({
    method: 'GET',
    url: `${config.get('IMAGES_SERVICE_URL')}/images?page=${page}`,
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  })

  private queryImageInfo = (id: string): AxiosPromise<IImageData> => axios({
    method: 'GET',
    url: `${config.get('IMAGES_SERVICE_URL')}/images/${id}`,
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  })

  async getImagesInfo(callback: (imageData: IImageData) => void) {
    let currentPage = 1;
    let currentBatchResponse = await this.queryPage(currentPage);

    const {
      data: {
        pictures,
        pageCount
      }
    } = currentBatchResponse;

    await this.getImagesDetails(pictures, callback);

    for (++currentPage; currentPage <= pageCount; currentPage++) {
      currentBatchResponse = await this.queryPage(currentPage);

      await this.getImagesDetails(currentBatchResponse.data.pictures, callback);
    }

    console.log('REFRESHING CACHE FINISHED...');
  }

  private async getImagesDetails(pictures: IPictureInput[], callback: (imageData: IImageData) => void) {
    const promises = pictures
      .map((pic: IPictureInput) => this.queryImageInfo(pic.id)
      );

    const response = await Promise.all(promises);
    response.forEach(({ data }: AxiosResponse<IImageData>) => {
      callback(data);
    });
  }
}

export default APIDataSource;
