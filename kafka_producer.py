from confluent_kafka import Producer
import json
import time
import logging
import sys
import random
from pizza_simulation import Branch,PizzaOrder


'''
The logging.basicConfig() method sets up the format of the log messages, including the timestamp 
format and the filename where the logs will be written. The logging.getLogger() method gets the
root logger, and the logger.setLevel(logging.INFO) method sets the logging level to INFO, which 
means that only messages with level INFO or higher will be logged. The logs will be written to a 
file named 'producer.log' in the same directory as the script and will overwrite the file if it already exists.
'''
logging.basicConfig(format='%(asctime)s %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S',
                    filename='producer.log',
                    filemode='w')

logger = logging.getLogger()
logger.setLevel(logging.INFO)


'''
create the producer by specifying the port of your Kafka cluster
'''
p=Producer({'bootstrap.servers':'localhost:9092'})

#####################
'''
Define a callback function that takes care of acknowledging new messages or errors
'''
def receipt(err,msg):
    if err is not None:
        print('Error: {}'.format(err))
    else:
        message = 'Produced message on topic {} with value of {}\n'.format(msg.topic(), msg.value().decode('utf-8'))
        logger.info(message)
        print(message)
        
#####################
print('Kafka Producer has been initiated...')

def simulate_pizza_order():
    branches_list = [
         {"id":1,"name":"GOLD PIZZA","region":"North"}
        ,{"id":2,"name":"GOLD PIZZA","region":"Haifa"}
        ,{"id":3,"name":"GOLD PIZZA","region":"Center"}
        ,{"id":4,"name":"GOLD PIZZA","region":"Dan"}
        ,{"id":5,"name":"GOLD PIZZA","region":"South"}
        ,{"id":6,"name":"GOLD PIZZA","region":"North"}
        ,{"id":7,"name":"GOLD PIZZA","region":"Haifa"}
        ,{"id":8,"name":"GOLD PIZZA","region":"Center"}
        ,{"id":9,"name":"GOLD PIZZA","region":"Dan"}
        ,{"id":10,"name":"GOLD PIZZA","region":"South"}
        ,{"id":11,"name":"GOLD PIZZA","region":"North"}
        ,{"id":12,"name":"GOLD PIZZA","region":"Haifa"}
        ,{"id":13,"name":"GOLD PIZZA","region":"Center"}
        ,{"id":14,"name":"GOLD PIZZA","region":"Dan"}
        ,{"id":15,"name":"GOLD PIZZA","region":"South"}
        ,{"id":16,"name":"GOLD PIZZA","region":"North"}
        ,{"id":17,"name":"GOLD PIZZA","region":"Haifa"}
        ,{"id":18,"name":"GOLD PIZZA","region":"Center"}
        ,{"id":19,"name":"GOLD PIZZA","region":"Dan"}
        ,{"id":20,"name":"GOLD PIZZA","region":"South"}
        ,{"id":21,"name":"GOLD PIZZA","region":"North"}
        ,{"id":22,"name":"GOLD PIZZA","region":"Haifa"}
        ,{"id":23,"name":"GOLD PIZZA","region":"Center"}
        ,{"id":24,"name":"GOLD PIZZA","region":"Dan"}
        ,{"id":25,"name":"GOLD PIZZA","region":"South"}
        ,{"id":26,"name":"GOLD PIZZA","region":"North"}
        ,{"id":27,"name":"GOLD PIZZA","region":"Haifa"}
        ,{"id":28,"name":"GOLD PIZZA","region":"Center"}
        ,{"id":29,"name":"GOLD PIZZA","region":"Dan"}
        ,{"id":30,"name":"GOLD PIZZA","region":"South"}]
    toppings = ["Pepperoni", "Mushrooms", "Onions", "Sausage", "Bacon", "Extra Cheese"]
    order_id = 1
    while True:
        for _ in range(10):
            branch = random.choice(branches_list)
            if not Branch(branch["id"],branch["name"],branch["region"]).open:
                #print(f"{branch['name']} ({branch['region']}) branch is closed, please select another branch.")
                continue

            order_toppings = random.sample(toppings, k=random.randint(1, len(toppings)))
            order = PizzaOrder(order_id, branch["id"], branch["name"], branch["region"], order_toppings)
            #print(f"Pizza order placed at {order.order_date_time} for branch {order.branch_name} ({order.region}) with toppings {order.toppings} and order ID: {order.order_id}.")
            complete_time = random.randint(5, 30)
            #print(f"Order will be completed in {complete_time} minutes.")
            #time.sleep(complete_time*60)
            order.complete_order()
            order_id += 1
            data={
           'branch_id': order.branch_id,
           'branch_name':order.branch_name,
           'topping': order.toppings ,
           'status': order.status 
           }
        m=json.dumps(data)
        p.poll(1)
        p.produce('user-tracker',m.encode('utf-8'),callback=receipt)
        p.flush()
        time.sleep(3)


        
if __name__ == '__main__':
    simulate_pizza_order()