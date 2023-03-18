const moment = require('moment');
const handleAverageOrderTime = async (req, res, client) => {
    try {
        const database = client.db("pizza");
        const ordersCollection = database.collection("orders");
        const completedOrders = await ordersCollection.find({ status: "completed" }).toArray();

        let totalSeconds = 0;
        for (const completedOrder of completedOrders) {
            
                const completedTime = `${completedOrder.order_time}`;
                const completedTime1 = moment.duration(completedTime).asSeconds();
                totalSeconds += completedTime1;
                console.log(totalSeconds)
            
        }

        const count = completedOrders.length;
        const averageSeconds = totalSeconds / count;
        // const averageTimeMs = totalDifference / count;
        // const averageTimeMin = averageTimeMs / (1000 * 60);
        // convert the total duration back to the format HH:mm:ss
        const hours = Math.floor(averageSeconds / 3600);
        const minutes = Math.floor((averageSeconds % 3600) / 60);
        const seconds = Math.floor(averageSeconds % 60);
        const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        console.log("here")
        console.log(formattedDuration)
        res.status(200).send({ formattedDuration });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    handleAverageOrderTime: handleAverageOrderTime
};