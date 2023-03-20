const express = require('express')
var cors = require('cors');
const BigML = require('bigml-node');
const bigml = require('bigml');
const { MongoClient } = require('mongodb');

const fs = require('fs');
const stringify = require('csv-stringify');

const app = express();
app.use(cors());
app.use(express.json());
app.listen(3100,()=>{
    console.log("Server is up on port 3100");
})

// ////////////////////mongoDB////////////////////////
const uri = "mongodb+srv://HAIM:261197@pizzacluster.8pd4dbj.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);
// const BIGML_USERNAME = 'goldlmilan';
// const BIGML_API_KEY = '7fa990585faea3ab895f44aff64707d6bdb4f30c';
////////////////////bigML//////////////////////
const BIGML_USERNAME = 'haimor1123';
const BIGML_API_KEY = 'c3bb7048d9838e550affc1ea0b47b25e2d69f9f6';
const sourceFilePath = './data/dataset.csv';


// // create a new BigML client
const bigmlClient = new BigML(BIGML_USERNAME, BIGML_API_KEY);
var connection = new bigml.BigML(BIGML_USERNAME,BIGML_API_KEY);

app.get('/createdataset', async (req, res) => {
  let counter = 1;
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db('pizza');
      const collection = db.collection('orders');
  
      const query = { status: "completed" };
      const orders = await collection.find(query).toArray();
  
      //Create dataset
      const dataset = [];
      let toppingsSet = new Set();
      orders.forEach(order => {
        order.topping.forEach(topping => {console.log(topping); toppingsSet.add(topping)});
      });

      const toppings = [...toppingsSet].sort();
      dataset.push(`order_id,${toppings.join(',')}`);
      orders.forEach(order => {
        const row = [counter++];
        toppings.forEach(topping => {
          row.push(order.topping.includes(topping) ? 1 : 0);
        });
        dataset.push(row.join(','));
      });
      fs.writeFileSync(sourceFilePath, dataset.join('\n'));
      console.log(dataset.length)
      res.send("Dataset Created");
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  
});


// app.get('/createdataset', async (req, res) => {
//   const client = new MongoClient(uri);
//   try {
//     await client.connect();
//     const db = client.db('pizza');
//     const collection = db.collection('orders');

//     const query = { status: "completed" };
//     const orders = await collection.find(query).toArray();
//     //Create dataset
//     const toppingsSet = new Set();
//     const ordersMap = {};
//     orders.forEach(order => {
//       const toppings = order.topping;
//       toppings.forEach(topping => toppingsSet.add(topping));
//       ordersMap[order.order_id] = {};
//       toppingsSet.forEach(t => ordersMap[order.order_id][t] = 0);
//       toppings.forEach(topping => ordersMap[order.order_id][topping] = 1);
//     });
//     console.log(toppingsSet)    
//     const dataset = [];
//     dataset.push(`order_id,${[...toppingsSet].join(',')}`);
//     for (const [orderId, toppings] of Object.entries(ordersMap)) {
//       const row = [];
//       row.push(orderId);
//       for (const [topping, value] of Object.entries(toppings)) {
//         row.push(value);
//       }
//       dataset.push(row.join(','));
//     }
//       fs.writeFileSync(sourceFilePath, dataset.join('\n'));

//     console.log(dataset);
//       res.send("Dataset Created");
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await client.close();
//   }
// });
  




  app.get('/predict', (req, res) => {
    console.log("Predict request has been recieved")
    const source = new bigml.Source(connection);
    source.create(sourceFilePath, { name: 'My data source' }, true, function (error, sourceInfo) {
      if (!error && sourceInfo) {
        const dataset = new bigml.Dataset(connection);
        dataset.create(sourceInfo, null, true, function (error, datasetInfo) {
          if (!error && datasetInfo) {
            const association = new bigml.Association(connection);
            association.create(datasetInfo, { name: 'ilan' }, true, function (error, associationInfo) {
              if (!error && associationInfo) {
                const model = new bigml.Model(connection);
                const results = {};        // save the result to export to json file
                results.data = [];
                console.log(associationInfo)
                model.get(associationInfo.resource, true, 'only_model=true;limit=-1', function (error, modelInfo) {
                  if (!error && modelInfo) {
                    for (let i = 0; i < modelInfo.object.associations.rules.length; i++) {
                      console.log(modelInfo.object.associations);
                      var src = modelInfo.object.associations.rules[i].lhs_cover[1]
                      var dest = modelInfo.object.associations.rules[i].rhs_cover[1]
                      var antecedent = modelInfo.object.associations.items.find((item) => item.count == src).name
                      var consequent = modelInfo.object.associations.items.find((item) => item.count == dest).name
                      var coverage = (modelInfo.object.associations.rules[i].lhs_cover[0] * 100) + '%'

                      var support = (modelInfo.object.associations.rules[i].support[0] * 100) + '%'
                      results.data.push({
                        product: antecedent,
                        items: consequent,
                        support: support,
                        coverage: coverage
                      });
                    }
                    console.log(results.data)
                    res.send(results.data);
                  }
                });
              }
            })
          }
        })
      }
    });
  });
  

