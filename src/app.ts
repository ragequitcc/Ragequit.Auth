import express, { Express, Router } from 'express';
import morgan from 'morgan';
import registerRoute from './routes/register';
import loginRoute from './routes/login';
import config from './util/config';

const app: Express = express();
const router: Router = Router();

router.get('/', async (req, res, next) => {
  res.send('nice');
});

registerRoute(router);
loginRoute(router);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan(process.env.MODE === 'development' ? 'dev' : 'tiny'));
app.use(router);

const port: Number = Number(config.port) || 8080;

app.listen(port);
