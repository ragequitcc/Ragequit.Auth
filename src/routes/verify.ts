import { Request, Response, NextFunction } from 'express';
import { RouteInterface, UserInterface, DecodedJWTInterface } from '../types';
import { User } from '../data/db';
import { addLog } from '../util/log';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const route: RouteInterface = {
  method: 'post',
  path: '/verify',
  controller: async (request: Request, response: Response) => {
    const authHeader: string | undefined = request.headers.authorization;

    if (!authHeader)
      return response.send({
        status: 'Error',
        message: 'Missing Authorization.',
      });

    const authToken: string = authHeader.split(' ')[1];
    jwt.verify(authToken, config.env, (error, decoded) => {
      if (error || !decoded)
        return response.send({
          status: 'Error',
          message: 'Invalid Token.',
        });

      User.findOne({
        where: {
          // @ts-ignore
          name: decoded.user.name,
        },
      })
        .then((user: UserInterface | null) => {
          if (user === null)
            return response.send({
              status: 'Error',
              message: 'User Not Found.',
            });
        })
        .catch((error) => {
          addLog(error);
          response
            .send({
              status: 'Error',
              message: 'Something Went Wrong.',
            })
            .status(500);
        });
    });
  },
};

export = route;
