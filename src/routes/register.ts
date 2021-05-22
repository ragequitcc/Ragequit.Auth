import Route from './routeInterface';
import { User } from '../data/authDb';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../util/crypto';

import { Request, Response, Router } from 'express';

const registerRoute: Route = (router: Router) => {
  router.post('/register', async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.pass) return res.send('error no username');

    // logic to store name and pass, needs encryption.

    encrypt(req.body.pass).then((hash) => {
      const user = new User({
        _id: uuidv4(),
        name: req.body.name,
        hash: hash,
      });

      user
        .save()
        .then((result) => {
          res.send({
            message: 'User Created',
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 11000) {
            res
              .send({
                error: 'Name Already In Use',
              })
              .status(403);
          } else if (error) {
            res
              .send({
                error: 'Unkown Error. Please Try Again Later',
              })
              .status(503);
          } else {
            res
              .send({
                message: 'User Created',
              })
              .status(201);
          }
        });
    });
  });
};

export default registerRoute;
