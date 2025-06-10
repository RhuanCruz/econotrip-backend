import IInitialSearchDTO from '@common/providers/SkyScannerProvider/dtos/IInitialSearchDTO';

interface ISkyScannerProvider {
  initialSearch(data: IInitialSearchDTO): Promise<any>;
}

export default ISkyScannerProvider;
