# pizza_simulator
#### A simulator will generate transaction data for orders and branch opening/closing events. 
#### The simulator generates a pizza order with a tip and including the order time, in which branch.
#### After a random time interval the simulator will report that the order is complete.

## prerequisets:
* `python3.8`     
* `docker-compose`

### windows
```bash
powershell
docker-compose
```

### mac / linux
```bash
docker-compose
```

## secrets
export your env var:      
```bash
MONGO_NAME=
MONGO_PASSWORD=
```

### Docker CLI Important  Commands
* docker-compose up -d
* docker stop <container-id>
* docker rmi -f $(docker images -aq)
* docker logs -f <container-name>
* docker exec -it <container-name> bash
* docker-compose down
* docker restart my_container

### kafka-broker cli commands
* kafka-console-producer --topic test-topic --bootstrap-server localhost:9092
* kafka-topics --bootstrap-server localhost:9092 --list
* kafka-topics --bootstrap-server localhost:9092 --delete --topic test-topic
* kafka-topics --bootstrap-server localhost:9092 --topic test-topic --create --partitions 3 --replication-factor 1
* kafka-console-consumer --topic test-topic --from-beginning --bootstrap-server localhost:9092

### cli commmands to connectors 
* curl -X GET http://connect:8083/connectors
* curl -X DELETE http://connect:8083/connectors/mongo-haim-sink

### check the connection string - mongodb
* mongo "mongodb+srv://HAIM:261197@pizzacluster.8pd4dbj.mongodb.net/test"
 
### start the mongoDB connector

curl -X POST \
     -H "Content-Type: application/json" \
     --data '
     {"name": "mongo-haim-sink",
      "config": {
         "connector.class":"com.mongodb.kafka.connect.MongoSinkConnector",
         "connection.uri":"mongodb+srv://{ask-haim}:{ask-haim}@pizzacluster.8pd4dbj.mongodb.net/?retryWrites=true&w=majority",
         "database":"pizza",
         "collection":"final-test",
         "topics":"test-topic",
         "schemas.enable": "false"
         }
     }
     ' \
     http://connect:8083/connectors -w "\n"




