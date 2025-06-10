interface ISeatsAeroProvider {
  read(file: string): Promise<Buffer>;
  listDir(path: string): Promise<Array<string>>;
}

export default ISeatsAeroProvider;
