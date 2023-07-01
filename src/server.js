import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {createServer} from './config/app.js';
import { createConnection, createFirebaseAdminConnection } from './config/connection.js';
import { router } from './routes/index.js';
import { errorHandlerMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import admin from 'firebase-admin';

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;
createConnection(DB_URI);
createFirebaseAdminConnection();
const app = createServer(PORT);

app.use(cors({
  origin: ["https://ph-assignment-11-9acd1.web.app","http://localhost:5173"],
  credentials: true
}));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://ph-assignment-11-9acd1.web.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });
  
// app.use(cors({credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandlerMiddleware);

app.use('/api', router);
