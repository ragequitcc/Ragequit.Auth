import { Request, Response, NextFunction } from 'express';
import { RouteInterface, UserInterface } from '../types';
import bcrypt from 'bcrypt';
import { User } from '../data/db';
import { addLog } from '../util/log';
import jwt from 'jsonwebtoken';

const route: RouteInterface = {
  method: 'post',
  path: '/login',
  controller: async (request: Request, response: Response) => {
    if (!request.body.name || !request.body.pass)
      return response.send({
        status: 'Error',
        message: 'Missing Username Or Password.',
      });

    User.findOne({
      where: {
        name: request.body.name,
      },
    })
      .then(async (user: UserInterface | null) => {
        if (!user)
          return response
            .send({
              status: 'Error',
              message: 'User Not Found.',
            })
            .status(400);

        // make password comparison.
        const compare = await bcrypt.compare(request.body.pass, user.hash);

        if (compare) {
          const token = await jwt.sign(
            {
              user: {
                name: user.name,
                roles: [],
              },
            },
            // @ts-ignore
            process.env.JWT_SECRET
          );

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
  },
};

export = route;
