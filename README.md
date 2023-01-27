# pizza_simulator
#### A simulator will generate transaction data for orders and branch opening/closing events. The simulator generates a pizza order with a tip and including the order time, in which branch.After a random time interval the simulator will report that the order is complete.
 ## HOW TO RUN 
 1. clone the project .
 2. install docker-compose on your environment.
 3. enter to the project directory and write in terninal the command "docker-compose up -d"
 4. now the zookeeper and broker are running . 
 5. run the producer.py file. 
 6. need to change - explain how to start the connector of mongoDB and ElasticSearch for consuming the data from kafka broker.
 
#### to install confluent 
curl -O http://packages.confluent.io/archive/6.1/confluent-6.1.1.tar.gz
tar zxf confluent-6.1.1.tar.gz 
vi ~/.bashrc

## check the connection string - mongodb
* mongo "mongodb+srv://HAIM:261197@pizzacluster.8pd4dbj.mongodb.net/test"

## kafka commands
#### Kafka cluster URL to list all topics
*  bin/kafka-topics.sh --bootstrap-server=localhost:9092 --list
#### –list option to display a list of all the topics in the Kafka cluster
* bin/kafka-topics.sh --list --zookeeper localhost:2181
#### to view metadata about the topics in your Kafka cluster.
* bin/kafka-topics.sh --bootstrap-server=localhost:9092 --describe --topic <topic-name>
#### to start to connector between kafka to mongoDB

$ curl -X PUT http://localhost:9092/connectors/sink-mongodb-users/config -H "Content-Type: application/json" -d ' {
      "connector.class":"com.mongodb.kafka.connect.MongoSinkConnector",
      "tasks.max":"1",
      "topics":"user-tracker",
      "connection.uri":mongodb+srv://HAIM:261197@pizzacluster.8pd4dbj.mongodb.net/test,
      "database":"BigBoxStore",
      "collection":"orders",
      "key.converter":"org.apache.kafka.connect.json.JsonConverter",
      "key.converter.schemas.enable":false,
      "value.converter":"org.apache.kafka.connect.json.JsonConverter",
      "value.converter.schemas.enable":false
}' 


