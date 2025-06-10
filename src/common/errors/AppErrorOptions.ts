import AppErrorDetail from './AppErrorDetail';

interface AppErrorOptions {
  status?: number;
  errors?: AppErrorDetail | Array<AppErrorDetail>;
}

export default AppErrorOptions;
