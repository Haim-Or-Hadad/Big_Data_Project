const handleCount = async (req, res, client) => {
    try {
        const database = client.db("pizza");
        const collection = database.collection("orders");
        const count = await collection.countDocuments();
        console.log(count);
        res.status(200).send({ count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    handleCount: handleCount
};