const handleOpenBranches = async (req, res, client) => {
    try {
        const now = new Date();
        const currentTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        const database = client.db("pizza");
        const collection = database.collection("branches");
        const openBranches = await collection.find({
            $expr: {
              $and: [
                { $lte: [ "$open", currentTime ] },
                { $gte: [ "$close", currentTime ] }
              ]
            }
          }).toArray();
        const count = openBranches.length;
        console.log(count);
        res.status(200).send({count});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    handleOpenBranches: handleOpenBranches
};