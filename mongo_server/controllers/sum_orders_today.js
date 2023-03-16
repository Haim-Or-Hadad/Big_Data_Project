const handleOrdersSum = async (req, res, client) => {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const database = client.db("pizza");
      const collection = database.collection("orders");
      const ordersSum = await collection.aggregate([
        {
          $match: {
            order_date: {
              $gte: today.toISOString()
            }
          }
        },
        {
          $group: {
            _id: null,
            sum: {
              $sum: "$total_price"
            }
          }
        },
        {
          $project: {
            _id: 0,
            sum: 1
          }
        }
      ]).toArray();
      const sum = ordersSum.length ? ordersSum[0].sum : 0;
      console.log(sum);
      res.status(200).send({sum});
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    handleOrdersSum: handleOrdersSum
  };
  