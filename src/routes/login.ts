import { Request, Response } from 'express';
import { RouteInterface } from '../types';
import bcrypt from 'bcrypt';
import { findUserByName } from '../util/db';
import { signToken } from '../util/jwt';

const route: RouteInterface = {
  method: 'post',
  path: '/login',
  controller: async (request: Request, response: Response) => {
    if (!request.body.name || !request.body.pass)
      return response.send({
        status: 'Error',
        message: 'Missing Username Or Password.',
      });

    const user = await findUserByName(request.body.name);

    if (!user)
      return response
        .send({
          status: 'Error',
          message: 'User Not Found.',
        })
        .status(400);

    const compare = await bcrypt.compare(request.body.pass, user.hash);

    if (compare) {
      const token = await signToken(user);

      response.send({
        status: 'Success',
        token: token,
      });
    } else {
      response.send({
        status: 'Error',
        message: 'Password Does Not Match.',
      });
    }
  },
};

export = route;
