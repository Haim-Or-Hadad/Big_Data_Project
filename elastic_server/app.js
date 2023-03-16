const express = require('express');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const PORT = 3313;
app.use(cors());

const client = new Client({ node: 'http://192.168.1.112:9200' }); 

app.get('/orders', async (req, res) => {
    const { start, end } = req.query; // Assuming the start and end date are passed as query parameters
    console.log(start)
    console.log(end)
    const response = await client.search({
      index: 'shared',
      body: {
        query: {
          range: {
            order_date: {
              gte: start, // Greater than or equal to start date
              lte: end // Less than or equal to end date
            }
          }
        }
      }
    });
  
    const documents = response.body.hits.hits.map(hit => hit._source);
    console.log(documents)
    res.send(documents);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
