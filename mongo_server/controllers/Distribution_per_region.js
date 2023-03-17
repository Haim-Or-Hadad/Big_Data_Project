const handlecountOrdersByRegion = async (req,res,client) => {
    try {
      const database = client.db("pizza");
      const collection = database.collection("orders");
      const countByRegion = await collection.aggregate([
        {
          $match: {
            status: "completed"
          }
        },
        {
          $group: {
            _id: "$region",
            count: { $sum: 1 }
          }
        }
      ]).toArray();
      console.log(countByRegion)
      res.status(200).send(countByRegion);
      return countByRegion;
    } catch (error) {
      console.error(error);
      return null;
    }
  };


  module.exports = {
    handlecountOrdersByRegion: handlecountOrdersByRegion
};