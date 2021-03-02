import IImageData from './IImageData';

export default interface IDataSource {
  getImagesInfo: (callback: (imageData: IImageData) => void) => void;
  initialize: () => Promise<void>;
}
