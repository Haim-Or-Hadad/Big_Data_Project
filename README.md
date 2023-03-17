# pizza_simulator
#### A simulator will generate transaction data for orders and branch opening/closing events.
#### The simulator generates a pizza order with a tip and including the order time, in which branch.
#### After a random time interval the simulator will report that the order is complete.


## prerequisets:

### windows
```text
python3.8
powershell
docker-compose
```

### mac / linux
```text
python3.8
docker-compose
```
---

## secrets
export your env var:
```bash
MONGO_USERNAME=<USERNAME>
MONGO_PASSWORD=<PASSWORD>
```
---

### Docker CLI Important  Commands
```bash
docker-compose up -d
docker stop <container-id>
docker rmi -f $(docker images -aq)
docker logs -f <container-name>
docker exec -it <container-name> bash
docker-compose down
docker restart my_container
--remove-orphans
```

---

### kafka-broker cli commands
```bash
kafka-console-producer --topic <TOPIC_NAME> --bootstrap-server localhost:9092
kafka-topics --bootstrap-server localhost:9092 --list
kafka-topics --bootstrap-server localhost:9092 --delete --topic <TOPIC_NAME>
kafka-topics --bootstrap-server localhost:9092 --topic <TOPIC_NAME> --create --partitions 3 --replication-factor 1
kafka-console-consumer --topic <TOPIC_NAME> --from-beginning --bootstrap-server localhost:9092
```
### elastic-search 
```bash
http://localhost:9200/ - Elasticsearch

```
 
### elastic query to list all messages pushed to the sink 
```bash
http://localhost:9200/shared/_search?pretty
```

### cli commmands to connectors
```bash
curl -X GET http://connect:8083/connectors # list all connectors
curl -X DELETE http://connect:8083/connectors/mongo-sink # delete a specific connector
```


### build and run the mongo_server
```bash
docker build -t mongo_server .
docker run -p 3004:3004 mongo_server
```

### build and run the elastic_Server
```bash
docker build -t elastic_server .
docker run -p 3313:3313 elastic_server
```


### check the connection string - mongodb
```bash
mongo "mongodb+srv://<USERNAME>:<PASSWORD>@pizzacluster.8pd4dbj.mongodb.net/test"
```
---

### to start the mongoDB connector
```bash
curl -X POST \
-H "Content-Type: application/json" \
--data '
{"name": "mongo-sink",
"config": {
"connector.class":"com.mongodb.kafka.connect.MongoSinkConnector",
"connection.uri":"mongodb+srv://HAIM:261197@pizzacluster.8pd4dbj.mongodb.net/?retryWrites=true&w=majority",
"database":"pizza",
"collection":"orders",
"topics":"shared",
"schemas.enable": "false"
}
}
' \
http://connect:8083/connectors -w "\n"

```
curl -X POST \
-H "Content-Type: application/json" \
--data '
{"name": "mongo-sink-branches",
"config": {
"connector.class":"com.mongodb.kafka.connect.MongoSinkConnector",
"connection.uri":"mongodb+srv://HAIM:261197@pizzacluster.8pd4dbj.mongodb.net/?retryWrites=true&w=majority",
"database":"pizza",
"collection":"branches",
"topics":"branches",
"schemas.enable": "false"
}
}
' \
http://connect:8083/connectors -w "\n"


### to start ElasticSearch connector
```bash
curl -X POST \
-H "Content-Type: application/json" \
--data '
{"name": "elasticsearch-sink",
  "config": {
  "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
  "tasks.max": "1",
  "topics": "shared",
  "key.ignore": "true",
  "schema.ignore": "true",
  "connection.url": "http://elastic:9200",
  "type.name": "_doc",
  "name": "elasticsearch-sink",
  "key.converter": "org.apache.kafka.connect.json.JsonConverter",
  "key.converter.schemas.enable": "false",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter.schemas.enable": "false",
  "transforms": "insertTS,formatTS",
  "transforms.insertTS.type": "org.apache.kafka.connect.transforms.InsertField$Value",
  "transforms.insertTS.timestamp.field": "messageTS",
  "transforms.formatTS.type": "org.apache.kafka.connect.transforms.TimestampConverter$Value",
  "transforms.formatTS.format": "yyyy-MM-dd HH:mm:ss",
  "transforms.formatTS.field": "messageTS",
  "transforms.formatTS.target.type": "string"
  }
}
' \
http://connect:8083/connectors -w "\n"
```

#### general helpful commands
```bash
docker ps | awk '{print $1}' # show the column that you need
watch -n1 'docker ps' # show in "live" the command  
bashrc # vim this directory to add new alias
git rm -env # remove file or dir from git 
```

#### Redis Commands
```bash
  docker run -d --name redis-docker -p 6379:6379 redis/redis-stack-server:latest
  docker exec -it redis-docker redis-cli
  KEYS * // to see all keys aftr entering redis-cli
  GET <key_name> // to see values
```