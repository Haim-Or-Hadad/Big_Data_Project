# pizza_simulator
This project is a big data management trend for a large pizzeria chain.
The system creates thousands of pizza orders at random hours, the data is pushed to Kafka Topic and then with the help of three connectors it is pushed to MongoDB (two collections) and to Elastic search.
In addition, there is a dashboard that sends requests to create association rules through bigml. Requests to search for orders on certain dates in Elastic. and presenting general data through MongoDB.
all the gemeral data saved in redis server .
all the project running with one click with docker-compose!.


<img src="https://user-images.githubusercontent.com/93033782/226176787-0326927d-a29e-424a-af8f-5170a17d1cfc.png" width="75%"> </br>

<img src="https://user-images.githubusercontent.com/93033782/226194833-3feb86b7-7d6e-42db-b7af-2d17c17f11b0.png" width="75%"> </br>

## How To Run 
1. clone the project. 
2. navigate in terminal to root folder.
3. run the command docker-compose up -d.
4. all the containers need to run , check with docker ps.
5.start the three connectors.
6. the commnds are below. 
7. go to dashboard in localhost:3000 and that's it!.

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
http://localhost:9200/shared/_search?pretty&size=100 # list from browser
```
 

### cli commmands to connectors
```bash
curl -X GET http://connect:8083/connectors # list all connectors
curl -X DELETE http://connect:8083/connectors/mongo-sink # delete a specific connector
```

### cli commmands to elastic search
```bash
curl -XGET 'http://localhost:9200/{shared}/_count?pretty=true' # count all documents
curl -XGET 'http://localhost:9200/{shared}/_search?size=10000&pretty' # elastic query to list all messages pushed to the sink
curl -XGET 'http://localhost:9200/shared/_search?pretty&size=100' # list 1000 messages
curl -XGET 'http://localhost:9200/{shared}/_search?pretty=true' -H 'Content-Type: application/json' -d'
{
  "query": {
    "match": {
      "order_date": "2023-03-24"
    }
  },
  "sort": [
    { "_id": "asc" }
  ],
  "size": 100
}' # return the search results 
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
