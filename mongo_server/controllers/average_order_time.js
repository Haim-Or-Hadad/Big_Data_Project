const handleAverageOrderTime = async (req, res, client) => {
    try {
        const database = client.db("pizza");
        const ordersCollection = database.collection("orders");
        const inProgressOrders = await ordersCollection.find({ status: "in progress" }).toArray();
        const orderIdsInProgress = inProgressOrders.map(order => order.order_id);
        const completedOrders = await ordersCollection.find({ order_id: { $in: orderIdsInProgress }, status: "completed" }).toArray();

        let totalDifference = 0;
        for (const inProgressOrder of inProgressOrders) {
            const completedOrder = completedOrders.find(completedOrder => completedOrder.order_id === inProgressOrder.order_id);
            if (completedOrder) {
                const inProgressDate = new Date(`${inProgressOrder.order_date}T${inProgressOrder.order_time}`);
                const completedDate = new Date(`${completedOrder.order_date}T${completedOrder.order_time}`);
                const timeDifferenceMs = completedDate - inProgressDate;
                totalDifference += timeDifferenceMs;
            }
        }

        const count = completedOrders.length;
        const averageTimeMs = totalDifference / count;
        const averageTimeMin = averageTimeMs / (1000 * 60);

        res.status(200).send({ averageTimeMin });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    handleAverageOrderTime: handleAverageOrderTime
};