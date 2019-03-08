import express from 'express';
import { log, logger } from './middleware/logger';
import userRouter from './routes/users';
import messageRouter from './routes/messages';
import inboxRouter from './routes/userMessages';
import contactRouter from './routes/contacts';

const app = express();

app.use(logger);

app.get('/', (req, res, next) => {
  res.send('Welcome to the EPIC Email..');
});

app.use('/api/v2/messages', inboxRouter);
app.use('/api/v2/messages', messageRouter);
app.use('/api/v2/users', userRouter);
app.use('/api/v2/contacts', contactRouter);

app.use((req, res, next) => {
  const error = new Error('route not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 400);
  res.json({
    status: '400',
    error: error.message,
  });
});

log();

app.listen(process.env.PORT || 8000, () => console.log('Server started... '));

export default app;