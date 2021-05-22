import Route from './routeInterface';
import { comparePassword } from '../util/crypto';
import { Request, Response, Router } from 'express';
import { User } from '../data/authDb';

const loginRoute: Route = (router: Router) => {
  router.post('/login', async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.pass)
      return res.send({
        error: 'Name Or Password Missing',
      });

    // logic to lookup user.
    return User.findOne({
      where: {
        name: req.body.name,
      },
    })
      .then((user) => {
        if (!user)
          return res.send({
            error: 'User Not Found',
          });

        res.send({
          message: 'Success',
        });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });
};

export default loginRoute;
