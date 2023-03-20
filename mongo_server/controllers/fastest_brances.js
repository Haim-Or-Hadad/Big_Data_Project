const handlefastest = async (req, res, client) => {
    try {
      const database = client.db("pizza");
      const collection = database.collection("orders");
      const lowestOrderTimeBranches = await collection.aggregate([
        {
          $match: {
            status: "completed"
          }
        },
        {
          $addFields: {
            orderDate: { $toDate: "$order_date" },
            orderTime: { $toDate: { $concat: [ "$order_date", "T", "$order_time", "Z" ] } }
          }
        },
        {
          $group: {
            _id: "$branch_id",
            avgOrderTime: { $avg: "$orderDateTime" }
          }
        },
        {
          $sort: { avgOrderTime: 1 }
        },
        {
          $limit: 5
        },
        {
          $lookup: {
            from: "branches",
            localField: "_id",
            foreignField: "branch_id",
            as: "branchInfo"
          }
        },
        {
          $project: {
            _id: 0,
            branchId: "$_id",
            branchName: { $arrayElemAt: ["$branchInfo.branch_name", 0] },
            avgOrderTime: { $divide: ["$avgOrderTime", 1000 * 60] } // convert from milliseconds to minutes
          }
        }
      ]).toArray();
      console.log(lowestOrderTimeBranches);
      res.status(200).send(lowestOrderTimeBranches);
      return lowestOrderTimeBranches;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  
  module.exports = {
    handlefastest :handlefastest
  };