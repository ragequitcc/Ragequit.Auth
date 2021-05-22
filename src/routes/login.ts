import Route from './routeInterface';
import { User } from '../data/authDb';
import { comparePassword } from '../util/crypto';

import { Request, Response, Router } from 'express';

const loginRoute: Route = (router: Router) => {
  router.post('/login', async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.pass)
      return res.send({
        error: 'Name Or Password Missing',
      });

    // logic to lookup user.
    User.findOne({
      name: req.body.name,
    }).then((user) => {
      if (user === null)
        return res.send({
          error: 'User Not Found',
        });

      comparePassword(req.body.pass, user.pass).then((result) => {
        if (result) {
          res.send({
            message: 'success',
          });
        } else {
          res.send({
            error: 'Wrong Username Or Password',
          });
        }
      });
    });
  });
};

export default loginRoute;
