import { NextFunction, Request, Response, Router } from "express";

type MiddlewareParam = (req: Request, res: Response, next: NextFunction) => void;

export enum EnumMethods {
  get = "get",
  post = "post",
  delete = "delete",
  put = "put",
  patch = "patch",
}

type Methods = keyof Pick<Router, keyof typeof EnumMethods>;

export interface Route {
  path: string;
  callback: (req: Request, res: Response, next: NextFunction) => void;
  method: Methods;
  middleware?: MiddlewareParam[];
}
