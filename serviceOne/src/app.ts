import express from 'express';
import config from './config';

const app = express();

const { port, appName } = config;

app.use((req, res, next) => {
  console.log(`${appName} route hit`)
  next();
})

app.get('/', (req, res) => {
  console.log(`Hit / on ${appName} - ${new Date()}`);

  res.send(`<h1>This is ${appName}`);
});

app.get('/401', (req, res) => {
  return res.status(401).send('401');
});


app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
})

