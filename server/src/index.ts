import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();
const CLIENT = path.join(__dirname, '../../client/dist');
const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;

app.use(express.static(CLIENT));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(path.join(CLIENT, '/index.html')), (err) => {
    if (err) res.status(500).send(err);
  });
});

app.listen(PORT, () => console.log(`Running at ${URL}`));

export {};
