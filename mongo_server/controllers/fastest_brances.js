
const handlefastest = async (req,res,client) => {
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
          $group: {
            _id: "$branch_id",
            avgOrderTime: { $avg: { $subtract: [ "$end_time", "$start_time" ] } }
          }
        },
        {
          $sort: { avgOrderTime: 1 }
        },
        {
          $limit: 6
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
            branchName: { $arrayElemAt: [ "$branchInfo.branch_name", 0 ] },
            avgOrderTime: { $divide: [ "$avgOrderTime", 1000 * 60 ] } // convert from milliseconds to minutes
          }
        }
      ]).toArray();
      res.status(200).send(lowestOrderTimeBranches);
      return lowestOrderTimeBranches;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  

module.exports = {
    handlefastest: handlefastest
};