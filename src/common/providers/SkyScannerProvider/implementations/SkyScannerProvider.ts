import { injectable } from 'inversify';
import axios from 'axios';

import { Errors, AppError } from '@src/common/errors';

import ISkyScannerProvider from '@common/providers/SkyScannerProvider/repositories/ISkyScannerProvider';
import IInitialSearchDTO from '@common/providers/SkyScannerProvider/dtos/IInitialSearchDTO';

@injectable()
class SkyScannerProvider implements ISkyScannerProvider {
  private api = axios.create({ baseURL: '{CHANGEME}' });

  public async initialSearch(data: IInitialSearchDTO): Promise<any> {
    return this.api.post('/create', data, { headers: { Authorization: 'Bearer {CHANGEME}' } })
      .then((res) => res.data)
      .catch(() => { throw AppError.createAppError(Errors.SKYSCANNER_INITIAL_SEARCH_FAILED); });
  }
}

export default SkyScannerProvider;
