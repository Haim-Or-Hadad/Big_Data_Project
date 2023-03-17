
const { json, response } = require('express');
const express = require('express')
var cors = require('cors');

const handleCount = require('./controllers/count_orders')
const handleOpenBranches = require('./controllers/open_branches');
const handleAverageOrderTime = require('./controllers/average_order_time');
const handleBestToppings = require('./controllers/5_top_toppings');
const handleBestBranches = require('./controllers/5_best_branches')
const handleOrdersSum = require('./controllers/sum_orders_today')
const handlecountOrdersByRegion = require('./controllers/Distribution_per_region')
const handlefastest = require('./controllers/fastest_brances')

const app = express();
app.use(cors());
app.use(express.json());
app.listen(3005,()=>{
    console.log("Server is up on port 3005");
})

const { MongoClient } = require('mongodb');

////////////////////mongoDB////////////////////////
const uri = "mongodb+srv://HAIM:261197@pizzacluster.8pd4dbj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

 
// await client.connect();

async function main() {
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error);

app.get('/count',(req,res,)=>{handleCount.handleCount(req,res,client)});
app.get('/open_branches',(req,res,)=>{handleOpenBranches.handleOpenBranches(req,res,client)});
app.get('/average_order_time',(req,res,)=>{handleAverageOrderTime.handleAverageOrderTime(req,res,client)});
app.get('/best_toppings',(req,res,)=>{handleBestToppings.handleBestToppings(req,res,client)});
app.get('/best_branches',(req,res,)=>{handleBestBranches.handleBestBranches(req,res,client)});
app.get('/sum_orders_today',(req,res,)=>{handleOrdersSum.handleOrdersSum(req,res,client)});
app.get('/distribution',(req,res,)=>{handlecountOrdersByRegion.handlecountOrdersByRegion(req,res,client)});
app.get('/fastest',(req,res,)=>{handlefastest.handlefastest(req,res,client)});