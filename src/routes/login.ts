import { Request, Response, NextFunction } from 'express';
import { RouteInterface, UserInterface } from '../types';
import bcrypt from 'bcrypt';
import { User } from '../data/db';

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

        console.log(compare);

        response.send('ok');
      })
      .catch((error) => {});

    response.send('nice');
  },
};

export = route;
