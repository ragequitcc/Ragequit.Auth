import express, { Express, Response, Request, Router } from 'express';
import morgan from 'morgan';
import registerRoute from './routes/register';
import loginRoute from './routes/login';
import config from './util/config';

const app: Express = express();
const router: Router = Router();

registerRoute(router);
loginRoute(router);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan(config.mode === 'development' ? 'dev' : 'tiny'));
app.use(router);

router.use((req: Request, res: Response) => {
  res
    .send({
      error: 'not found',
      code: 404,
    })
    .status(404);
});

app.listen(config.port);
