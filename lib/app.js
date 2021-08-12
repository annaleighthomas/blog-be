import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import cors from 'cors';
import postController from './controllers/posts.js';


const app = express();

app.use(express.json());
app.use(cors());

app.use(postController);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
