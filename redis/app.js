import { createClient } from 'redis'; 
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const client = createClient();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
// await client.set(key, value);

app.post('/set', async (req, res) => {
  const { key, value } = req.body;
  await client.set(key, value);

  res.sendStatus(200);
});


app.listen(3001, () => {
  console.log('Express server listening on port 3001');
});

// const value = await client.get('key'); 
// const test = await client.get('Haim'); 
// console.log(value); console.log(test); 
