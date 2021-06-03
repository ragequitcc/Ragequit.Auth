import { Request, Response, NextFunction } from 'express';
import { RouteInterface, UserInterface, DecodedJWTInterface } from '../types';
import { decodeToken } from '../util/jwt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const route: RouteInterface = {
  method: 'post',
  path: '/decode',
  controller: async (request: Request, response: Response) => {
    const authHeader: string | undefined = request.headers.authorization;

    if (!authHeader)
      return response.send({
        status: 'Error',
        message: 'Missing Authorization Header.',
      });

    const authToken: string = authHeader.split(' ')[1];

    const decodedToken = await decodeToken(authToken);

    if (decodedToken) {
      response.send({
        status: 'Success',
        message: 'Validation Successful.',
        data: decodedToken,
      });
    } else {
      response
        .send({
          status: 'Error',
          message: 'Validation Failed.',
        })
        .status(401);
    }
  },
};

export = route;
