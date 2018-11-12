import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import config from './services/core/config';
import { bunyanLogger as logger } from './services/core/logger';


const port = config.get('PORT');
const app = express();

app.use(cors({origin: true, credentials: true}));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/favicon.ico', (req, res) => res.end());

app.use('/test', (req, res) => res.end('ok'));

app.listen(port, () => {
    logger.info('Listening on port: ' + port);
});

