class AppErrorDetail {
  public title: string;

  public message: string;

  public internalCode: string;

  public detail?: string | null = null;

  public field?: string | null = null;

  constructor(title: string, message: string, internalCode: string, detail?: string | null, field?: string | null) {
    this.title = title;
    this.message = message;
    this.internalCode = internalCode;
    this.detail = detail;
    this.field = field;
  }
}

export default AppErrorDetail;
