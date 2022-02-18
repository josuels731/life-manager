import express, { json } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { log } from './assets/logger';
import { requestLogger } from './assets/expressRequestLogger';
import users from './routes/users';
import tasks from './routes/tasks/tasks';

const PORT = 80;

const server = express();
const http = createServer(server);

server.use(cors());
server.use(json());
server.use(requestLogger)
server.use('/users', users)
server.use('/tasks', tasks)

http.listen(PORT);
log(`Server available at port ${PORT}`, 'server_main');