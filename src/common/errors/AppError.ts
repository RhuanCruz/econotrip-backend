import { StatusCodes } from 'http-status-codes';
import AppErrorDetail from './AppErrorDetail';
import AppErrorOptions from './AppErrorOptions';
import ErrorData from './ErrorData';

class AppError {
  public readonly timestamp: Date = new Date();

  public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;

  public errors: Array<AppErrorDetail> = [];

  constructor(data?: AppErrorOptions) {
    this.setStatusCode(data?.status);
    this.setErrors(data?.errors);
  }

  public static createAppError(data: ErrorData, detail?: string): AppError {
    const appError = new AppError();
    appError.setStatusCode(data.statusCode);
    appError.setErrors(new AppErrorDetail(data.title, detail ?? data.detail, data.code));
    return appError;
  }

  public setStatusCode(status?: number) {
    if (status) this.statusCode = status;
  }

  public setErrors(errors?: AppErrorDetail | Array<AppErrorDetail>) {
    if (!errors) this.errors = [new AppErrorDetail('Undocumented error', 'Undocumented error', 'INTERNAL_ERROR')];
    else if (Array.isArray(errors)) this.errors = errors;
    else this.errors = [errors];
  }
}

export default AppError;
