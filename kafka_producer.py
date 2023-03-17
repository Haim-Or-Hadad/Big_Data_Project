from confluent_kafka import Producer
import json
import time
import logging
import sys
import random
from pizza_simulation import Branch,PizzaOrder
import os
from datetime import datetime
import random
import datetime
import logging

# Configure the logging module
logging.basicConfig(level=logging.INFO)
# USERNAME = os.environ.get('MONGO_NAME')
# PASSWORD = os.environ.get('MONGO_PASSWORD')

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
conf = {
    'bootstrap.servers': 'localhost:9092', # Replace with the address and port of your Kafka broker
    'client.id': 'python-producer'
}

def delivery_report(err, msg):
    if err is not None:
        print('Message delivery failed: {}'.format(err))
    else:
        print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))

producer = Producer(conf)

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

branches_list = [
         {"id":1,"name":"GOLD PIZZA","region":"North",'open' : '10:00:00', 'close' : '00:00:00'}
        ,{"id":2,"name":"GOLD PIZZA","region":"Haifa",'open' : '10:00:00', 'close' : '23:00:00'}
        ,{"id":3,"name":"GOLD PIZZA","region":"Center",'open' : '09:00:00', 'close' : '20:00:00'}
        ,{"id":4,"name":"GOLD PIZZA","region":"Dan",'open' : '08:00:00', 'close' : '17:00:00'}
        ,{"id":5,"name":"GOLD PIZZA","region":"South",'open' : '11:00:00', 'close' : '00:00:00'}
        ,{"id":6,"name":"GOLD PIZZA","region":"North",'open' : '12:00:00', 'close' : '23:00:00'}
        ,{"id":7,"name":"GOLD PIZZA","region":"Haifa",'open' : '13:00:00', 'close' : '22:00:00'}
        ,{"id":8,"name":"GOLD PIZZA","region":"Center",'open' : '09:00:00', 'close' : '21:00:00'}
        ,{"id":9,"name":"GOLD PIZZA","region":"Dan",'open' : '09:00:00', 'close' : '20:00:00'}
        ,{"id":10,"name":"GOLD PIZZA","region":"South",'open' : '10:00:00', 'close' : '19:00:00'}
        ,{"id":11,"name":"GOLD PIZZA","region":"North",'open' : '10:00:00', 'close' : '18:00:00'}
        ,{"id":12,"name":"GOLD PIZZA","region":"Haifa",'open' : '10:00:00', 'close' : '17:00:00'}
        ,{"id":13,"name":"GOLD PIZZA","region":"Center",'open' : '11:00:00', 'close' : '17:00:00'}
        ,{"id":14,"name":"GOLD PIZZA","region":"Dan",'open' : '11:00:00', 'close' : '17:00:00'}
        ,{"id":15,"name":"GOLD PIZZA","region":"South",'open' : '10:00:00', 'close' : '00:00:00'}
        ,{"id":16,"name":"GOLD PIZZA","region":"North",'open' : '10:00:00', 'close' : '00:00:00'}
        ,{"id":17,"name":"GOLD PIZZA","region":"Haifa",'open' : '08:00:00', 'close' : '21:00:00'}
        ,{"id":18,"name":"GOLD PIZZA","region":"Center",'open' : '07:00:00', 'close' : '22:00:00'}
        ,{"id":19,"name":"GOLD PIZZA","region":"Dan",'open' : '10:00:00', 'close' : '20:00:00'}
        ,{"id":20,"name":"GOLD PIZZA","region":"South",'open' : '08:00:00', 'close' : '19:00:00'}
        ,{"id":21,"name":"GOLD PIZZA","region":"North",'open' : '12:00:00', 'close' : '17:00:00'}
        ,{"id":22,"name":"GOLD PIZZA","region":"Haifa",'open' : '12:00:00', 'close' : '17:00:00'}
        ,{"id":23,"name":"GOLD PIZZA","region":"Center",'open' : '14:00:00', 'close' : '22:00:00'}
        ,{"id":24,"name":"GOLD PIZZA","region":"Dan",'open' : '12:00:00', 'close' : '00:00:00'}
        ,{"id":25,"name":"GOLD PIZZA","region":"South",'open' : '12:00:00', 'close' : '04:00:00'}
        ,{"id":26,"name":"GOLD PIZZA","region":"North",'open' : '11:00:00', 'close' : '01:00:00'}
        ,{"id":27,"name":"GOLD PIZZA","region":"Haifa",'open' : '09:00:00', 'close' : '23:00:00'}
        ,{"id":28,"name":"GOLD PIZZA","region":"Center",'open' : '08:00:00', 'close' : '23:00:00'}
        ,{"id":29,"name":"GOLD PIZZA","region":"Dan",'open' : '09:00:00', 'close' : '21:00:00'}
        ,{"id":30,"name":"GOLD PIZZA","region":"South",'open' : '10:00:00', 'close' : '22:00:00'}]


toppings = ["Pepperoni", "Mushrooms", "Onions", "Sausage", "Bacon", "Extra Cheese"]




def simulate_pizza_order():
    order_id = 1
    while True:
            branch = random.choice(branches_list)
            # Get today's date and a random date within the next week
            today = datetime.date.today()
            next_week = today + datetime.timedelta(days=7)
            random_date = today + datetime.timedelta(days=random.randint(0, 7))
 
            order_toppings = random.sample(toppings, k=random.randint(1, len(toppings)))
            order = PizzaOrder(order_id, branch["id"], branch["name"], branch["region"], order_toppings)
            # print(f"Pizza order placed at {order.order_date_time} for branch {order.branch_name} ({order.region}) with toppings {order.toppings} and order ID: {order.order_id}.")
            date = random_date.isoformat()

            # Parse the open and close time strings into datetime.time objects
            open_time = datetime.datetime.strptime(branch['open'], '%H:%M:%S').time()
            close_time = datetime.datetime.strptime(branch['close'], '%H:%M:%S').time()
            
            # Generate a random time between open and close time
            time_diff = datetime.datetime.combine(datetime.date.today(), close_time) - datetime.datetime.combine(datetime.date.today(), open_time)
            random_time = datetime.datetime.combine(datetime.date.today(), open_time) + datetime.timedelta(seconds=random.randint(0, time_diff.seconds))
            time_only_str = random_time.strftime('%H:%M:%S')

            order_id += 1
            data={
            'order_id' : order_id,
            'branch_id': order.branch_id,
            'branch_name':order.branch_name,
            'topping': order.toppings ,
            'order_date' : date,
            'order_time' : time_only_str, 
            'status': order.status ,
            'region': order.region
            }
            m=json.dumps(data)
            producer.poll(1)
            producer.produce('shared', m.encode('utf-8')  , callback=delivery_report)
            producer.flush()
            order.complete_order()
            # generate a random number of seconds between 540 (9 minutes) and 2400 (40 minutes)
            random_seconds = random.randint(540, 2400 )
            orderStartTime = datetime.datetime.strptime(time_only_str, '%H:%M:%S').time()
            # add the random number of seconds to the start time to get the end time
            end_order = (datetime.datetime.combine(datetime.date.today(), orderStartTime) + datetime.timedelta(seconds=random_seconds)).time()
            end_time_str = end_order.strftime('%H:%M:%S')
            data={
            'order_id' : order_id,
            'branch_id': order.branch_id,
            'branch_name':order.branch_name,
            'topping': order.toppings ,
            'order_date' : date,
            'start_time ' : time_only_str,
            'order_time' : end_time_str, 
            'status': order.status 
            }
            print(data)
            m=json.dumps(data)
            producer.poll(1)
            producer.produce('shared', m.encode('utf-8')  , callback=delivery_report)
            producer.flush()
            print("success")
            time.sleep(1)


        
if __name__ == '__main__':
    simulate_pizza_order()