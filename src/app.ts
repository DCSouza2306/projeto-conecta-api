import express from 'express';
import { loadEnv } from './database/envs';
import cors from 'cors';

loadEnv();

const app = express();

export default app;