const handleBestToppings = async (req, res, client) => {
  try {
    const database = client.db("pizza");
    const collection = database.collection("orders");
      
    const result = await collection.aggregate([
      { $unwind: "$topping" },
      { $group: { _id: "$topping", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]).toArray();
  
    const bestToppings = result.map((item) => ({
      name: item._id,
      count: item.count
    }));
    
    res.status(200).send({ bestToppings });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  handleBestToppings: handleBestToppings
};
