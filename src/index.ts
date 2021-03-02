import express, { Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';

import router from './routes'

const app = express();

const port = config.get('PORT');

app.use(morgan('tiny'));

app.use('/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!!');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
