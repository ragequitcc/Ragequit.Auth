import { Request, Response, NextFunction } from 'express';

export interface RouteInterface {
  method: string;
  path: string;
  controller(request: Request, response: Response, next?: NextFunction): void;
}

export interface UserInterface {
  id?: number;
  name: string;
  hash: string;
}

export interface LogInterface {
  id?: number;
  log: object;
}

export interface SuccessResponse {
  status: string;
  message: string;
}

export interface ErrorResponse {
  status: string;
  message: string;
}

export interface DecodedJWTInterface {
  user: {
    name: string;
    roles: string[];
  };
}

export interface ConfigInterface {
  port: number;
  db: {
    user: string;
    pass: string;
    port: number;
    host: string;
    retries: number;
    name: string;
  };
  jwt: {
    secret: string;
  };
  env: string;
}
