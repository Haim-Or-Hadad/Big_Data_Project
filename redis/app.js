import { createClient } from 'redis'; 
const express = require('express');

const client = createClient();
const app = express();

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
await client.disconnect(); 