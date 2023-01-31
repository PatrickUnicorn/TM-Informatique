import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';

const app = express();
app.use(bodyParser.json());

const Client = pkg.Client;
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: '*AsdF777*',
    database: ''
  });

client.connect();

app.post('/Student-long-answers', async (req, res) => {
  const { answer } = req.body;
  const result = await client.query('INSERT INTO Student-long-answers (answer) VALUES ($1)', [answer]);
  res.send({ status: 'success' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
