const express = require('express')
var cors = require('cors');
const BigML = require('bigml-node');
const bigml = require('bigml');
const { MongoClient } = require('mongodb');


const app = express();
app.use(cors());
app.use(express.json());
app.listen(3100,()=>{
    console.log("Server is up on port 3100");
})

// ////////////////////mongoDB////////////////////////
// const uri = "mongodb+srv://HAIM:261197@pizzacluster.8pd4dbj.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);


////////////////////bigML//////////////////////
const BIGML_USERNAME = 'haimor1123';
const BIGML_API_KEY = 'c3bb7048d9838e550affc1ea0b47b25e2d69f9f6';
const sourceFilePath = './data/dataset.csv';


// // create a new BigML client
const bigmlClient = new BigML(BIGML_USERNAME, BIGML_API_KEY);
var connection = new bigml.BigML('haimor1123','c3bb7048d9838e550affc1ea0b47b25e2d69f9f6') 


async function main() {
  // Connect to MongoDB
  await client.connect();
  const db = client.db('pizza');
  const collection = db.collection('orders');

  // Retrieve completed orders with toppings from MongoDB
  const orders = await collection.find({ status: 'completed' }).toArray();
  const toppings = orders.map((order) => order.topping);
// Define the data and columns
const columns = [
  "order_id",
  "pepperoni",
  "mushrooms",
  "olives",
  "onions",
  "sausage",
  "bacon",
  "peppers",
];


data = [] 

  //Loop through each order and count the toppings
  for (let i = 0; i < toppings.length; i++) {
    topping_dict = {
      'order_id' : 0,
      'Pepperoni': 0,
      'Mushrooms': 0,
      'Olives': 0,
      'Onions': 0,
      'Sausage': 0,
      'Bacon': 0,
      'Peppers': 0
  }
    curr_data = []
    const order = toppings[i];
    for (let j = 0; j < order.length; j++) {
      const topping = order[j];
        topping_dict[topping] = 1;
      }
    for (let key in topping_dict) {
      if (key == 'order_id'){
        curr_data.push(i);
      }
      else{
      curr_data.push(topping_dict[key]);
    }
  }
    
    data.push(curr_data)
    }
    for (let i = 0; i < data.length; i++) {
      let list = data[i];
      if (list.length !== 8) {
        if (list.length === 9) {
          list.pop();
        } else {
          while (list.length < 8) {
            list.push(0);
          }
        }
      }
    }

  }
 


  app.get('/predict', (req, res) => {
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
                model.get(associationInfo.resource, true, 'only_model=true;limit=-1', function (error, modelInfo) {
                  if (!error && modelInfo) {
                    for (let i = 0; i < modelInfo.object.associations.rules.length; i++) {
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
  

