import { connect, connection } from 'mongoose';
import { error, log } from './assets/logger';

const mongoUrl = process.env['MONGO_URL'] ?? 'mongodb://localhost:27017/life-manager';

connect(mongoUrl);

connection.on('error', err => error(err, 'database_connection'));
connection.on('connecting', () => log('Connecting to the database', 'database_connection'));
connection.on('connected', () => log('Connected to the database', 'database_connection'));