import { injectable } from 'inversify';
import { readFile, readdir } from 'fs/promises';
import IStorageProvider from '@src/common/providers/StorageProvider/repositories/IStorageProvider';

@injectable()
class LocalStorageProvider implements IStorageProvider {
  read(file: string): Promise<Buffer> {
    return readFile(file);
  }

  listDir(path: string): Promise<Array<string>> {
    return readdir(path);
  }
}

export default LocalStorageProvider;
