import IImageData from '../dataSource/IImageData';

export default interface IStorateService {
  addImageData: (imageData: IImageData) => void;
  clearData: () => void;
  getAllImagesData: () => Promise<IImageData[]>;
  initialize: () => Promise;
}
