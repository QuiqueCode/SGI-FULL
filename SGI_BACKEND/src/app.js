import express from 'express'
import userRoutes from './routes/users.routes.js'
import cors from 'cors';

const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(express.json());
app.use('/api',userRoutes)



export default app;