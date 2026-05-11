import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {connectMongoDB} from './db/connectMongoDB.js';
import {logger} from './middleware/logger.js';
import {notFoundHandler} from './middleware/notFoundHandler.js';
import {errorHandler} from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;

await connectMongoDB();
app.use(logger());

app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
  }),
);
app.use(cors());

app.use(notesRouter);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
