#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m' # No Color

declare -A connectors=(
    ["mongo"]="{\"name\": \"mongo-sink\",\"config\": {\"connector.class\":\"com.mongodb.kafka.connect.MongoSinkConnector\",\"connection.uri\":\"mongodb+srv://HAIM:261197@pizzacluster.8pd4dbj.mongodb.net/?retryWrites=true&w=majority\",\"database\":\"pizza\",\"collection\":\"orders\",\"topics\":\"shared\",\"schemas.enable\": \"false\"}}"
    ["elastic"]="{\"name\": \"elasticsearch-sink\",\"config\": {\"connector.class\": \"io.confluent.connect.elasticsearch.ElasticsearchSinkConnector\",\"tasks.max\": \"1\",\"topics\": \"shared\",\"key.ignore\": \"true\",\"schema.ignore\": \"true\",\"connection.url\": \"http://elastic:9200\",\"type.name\": \"_doc\",\"name\": \"elasticsearch-sink\",\"key.converter\": \"org.apache.kafka.connect.json.JsonConverter\",\"key.converter.schemas.enable\": \"false\",\"value.converter\": \"org.apache.kafka.connect.json.JsonConverter\",\"value.converter.schemas.enable\": \"false\",\"transforms\": \"insertTS,formatTS\",\"transforms.insertTS.type\": \"org.apache.kafka.connect.transforms.InsertField\$Value\",\"transforms.insertTS.timestamp.field\": \"messageTS\",\"transforms.formatTS.type\": \"org.apache.kafka.connect.transforms.TimestampConverter\$Value\",\"transforms.formatTS.format\": \"yyyy-MM-dd HH:mm:ss\",\"transforms.formatTS.field\": \"messageTS\",\"transforms.formatTS.target.type\": \"string\"}}"
)

echo -e "${GREEN}starting docker-compose...${NC}"
docker-compose up -d

echo -e "${GREEN}waiting for connect to be ready...${NC}"
for i in {1..60};do curl -f -X GET http://localhost:8083/connectors && break || sleep 3; done;
curl -f -X GET http://localhost:8083/connectors && echo "" && echo "Connect is up and running!" || exit 1

echo -e "${GREEN}Creating sinks...${NC}"
sleep 2
for conn in "${!connectors[@]}"
do
    echo -e "${GREEN}Creating $conn sink${NC}"
    curl -X POST -H "Content-Type: application/json" --data "${connectors[$conn]}" http://localhost:8083/connectors -w "\n"
    sleep 3
done

echo -e "${GREEN}listing all connectors...${NC}"
curl -X GET http://localhost:8083/connectors
