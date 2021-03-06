import { Request, Response } from 'express';
import { RouteInterface } from '../types';
import { Log } from '../data/db';
import config from '../config/config';

const route: RouteInterface = {
  method: 'get',
  path: '/logs',
  controller: async (request: Request, response: Response) => {
    if (config.env === 'development') {
      const logs = await Log.findAll();

      response.send(logs);
    } else {
      response.send({
        status: 'Error',
        message: 'App Is Running In Production Mode.',
      });
    }
  },
};

export = route;
