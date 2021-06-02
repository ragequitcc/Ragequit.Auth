import express, { Express, Router } from 'express';
import morgan from 'morgan';
import { readdir } from 'fs';
import config from './config/config';

const app: Express = express();
const router: Router = Router();

readdir(`${__dirname}/routes`, (error, files) => {
  if (error) return new Error('Error Loading Routes');

  Object.keys(files).forEach((value, index) => {
    import(`${__dirname}/routes/${files[index]}`).then((route) => {
      switch (route.method) {
        case 'post':
          router.post(route.path, route.controller);
          break;
        case 'get':
          router.get(route.path, route.controller);
          break;
        case 'delete':
          router.delete(route.path, route.controller);
          break;
      }
    });
  });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan(config.env === 'development' ? 'dev' : 'tiny'));
app.use(router);
app.use((req, res) => {
  res
    .send({
      error: '404 - Route Not Found',
    })
    .status(404);
});
app.listen(config.port);
