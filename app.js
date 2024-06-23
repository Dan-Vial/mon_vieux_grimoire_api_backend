import express, { json, urlencoded } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
const swaggerDocument = yaml.load('swagger.yaml');
import 'dotenv/config';
import './mongodb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename));

import userRoutes from './routes/user.js';
import bookRoutes from './routes/book.js';

var app = express();

app.use(logger('dev'));
app.use(compression());

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);

let options = {
  explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

export default app;
