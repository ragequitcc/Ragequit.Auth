import Route from './routeInterface';
import {User} from '../data/authDb';
import { v4 as uuidv4 } from 'uuid';
import {encrypt} from '../util/crypto';

import { Request, Response, Router } from 'express';

const registerRoute: Route = (router: Router) => {
  router.post('/register', async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.pass) return res.send('error no username');

    // logic to store name and pass, needs encryption.

    encrypt(req.body.pass).then((hash) => {
      const user = new User({
        _id: uuidv4(),
        name: req.body.name,
        pass: hash,
      });

      user.save();
    });

    res.send('ok');
  });
};

export default registerRoute;
