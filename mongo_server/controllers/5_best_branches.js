const handleBestBranches = async (req, res, client) => {
    try {
      const database = client.db("pizza");
      const ordersCollection = database.collection("orders");
  
      const pipeline = [
        {
          $match: {
            status: "completed",
          },
        },
        {
          $group: {
            _id: "$region",
            totalOrders: { $sum: 1 },
          },
        },
        {
          $sort: { totalOrders: -1 },
        },
        {
          $limit: 3,
        },
        {
          $lookup: {
            from: "branches",
            localField: "_id",
            foreignField: "branch_id",
            as: "branch_info",
          },
        },
      ];
  
      const bestBranches = await ordersCollection.aggregate(pipeline).toArray();
  
      res.status(200).send(bestBranches);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  };
  
  module.exports = {
    handleBestBranches: handleBestBranches,
  };
  