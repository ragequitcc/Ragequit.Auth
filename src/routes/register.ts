import { Request, Response } from 'express';
import { RouteInterface, UserInterface } from '../types';
import bcrypt from 'bcrypt';
import { User } from '../data/db';
import { addLog } from '../util/log';
import { signToken } from '../util/jwt';

const route: RouteInterface = {
  method: 'post',
  path: '/register',
  controller: async (request: Request, response: Response) => {
    if (!request.body.name || !request.body.pass)
      return response.send({
        status: 'Error',
        message: 'Missing Username Or Password.',
      });

    const regexp = new RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    );

    if (!regexp.test(request.body.pass)) {
      response
        .send({
          status: 'Error',
          message:
            'The password must contain at least one number and one special character.',
        })
        .status(400);
    }

    const passwordHash = await bcrypt.hash(request.body.pass, 10);

    User.create({
      name: request.body.name,
      hash: passwordHash,
    })
      .then(async (user: User) => {
        const token = await signToken(user);
        response.send({
          status: 'Success',
          message: `User ${user.name} created.`,
          token: token,
        });
      })
      .catch((error) => {
        if (error.parent.errno === 1062) {
          response
            .send({
              status: 'Error',
              message: 'Name Already Taken.',
            })
            .status(403);
        } else {
          addLog(error);

          response
            .send({
              status: 'Error',
              message: 'Something Went Wrong.',
            })
            .status(500);
        }
      });
  },
};

export = route;
