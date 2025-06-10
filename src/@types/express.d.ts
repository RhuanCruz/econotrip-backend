declare namespace Express {
  export interface Request {
    auth: {
      user: number | null;
      admin: boolean;
      permissions: Array<string>;
    };
  }
}
