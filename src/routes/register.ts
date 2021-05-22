import Route from './routeInterface';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../util/crypto';
import { User } from '../data/authDb';

import { Request, Response, Router } from 'express';

const registerRoute: Route = (router: Router) => {
  router.post('/register', async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.pass) return res.send('error no username');

    // logic to store name and pass, needs encryption.

    return encrypt(req.body.pass).then((hash) => {
      User.create({
        id: uuidv4(),
        name: req.body.name,
        hash: hash,
      })
        .then((user) => {
          res.send({
            message: 'User Created',
          });
        })
        .catch((error) => {
          res
            .send({
              error: 'Name Already In Use',
            })
            .status(402);
          // if (error.original.errno === 1062) {
          //   res
          //     .send({
          //       error: 'Name Already In Use',
          //     })
          //     .status(402);
          // } else {
          //   res
          //     .send({
          //       error: 'Something Went Wrong',
          //     })
          //     .status(500);
          // }
        });
    });
  });
};

export default registerRoute;
