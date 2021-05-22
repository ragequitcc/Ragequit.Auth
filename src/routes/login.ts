import Route from './routeInterface';
import {User} from '../data/authDb';

import { Request, Response, Router } from 'express';

const loginRoute: Route = (router: Router) => {
  router.post('/login', async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.pass) return res.send('error no username');

    // logic to lookup user.
    res.send('login');
  });
};

export default loginRoute;
