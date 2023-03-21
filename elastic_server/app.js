const express = require('express');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const PORT = 3313;
app.use(cors());

const client = new Client({ node: 'http://10.0.0.9:9200' }); 

app.get('/orders', async (req, res) => {
  const { start, end } = req.query;
  console.log(start)
  console.log(end)
  const response = await client.search({
      index: 'shared',
      body: {
          query: {
              range: {
                  order_date: {
                      gte: start,
                      lte: end
                  }
              }
          },
          size: 300 // Set the maximum number of search results to 200
      }
  });
  
    const documents = response.body.hits.hits.map(hit => hit._source);
    console.log(documents)
    res.send(documents);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
