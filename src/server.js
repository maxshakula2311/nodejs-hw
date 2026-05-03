import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.get('/notes', (req, res, next) => {
  res.status(200).json({"message": "Retrieved all notes"});
  next();
});

app.get('/notes/:noteId', (req, res, next) => {
  const { id_param } = req.params.noteId;
  res.status(200).json({ message: `Retrieved note with ID: ${id_param}` });
  next();
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res) => {
  res.status(500).json({message: 'Internal Server Error'});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
