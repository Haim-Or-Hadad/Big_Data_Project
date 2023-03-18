const handleStartTimeArray = async (req, res, client) => {
    try {
        const database = client.db("pizza");
        const collection = database.collection("orders");
        const query = { status: "completed" };
        const orders = await collection.find(query).toArray();
        console.log(orders)
        const startTimes = orders.map((order) => order.order_time);
        res.status(200).send({ startTimes });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    handleStartTimeArray: handleStartTimeArray
};
