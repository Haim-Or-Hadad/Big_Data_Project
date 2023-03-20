import random
import time
from datetime import datetime



'''This class has a constructor that builds pizza orders''' 
class PizzaOrder:
    def __init__(self, order_id, branch_id, branch_name, region, toppings):
        '''
        Construct a new 'PizzaOrder' object.
        :param order_id: The id of order
        :param branch_id: The id of pizza branch
        :param branch_name: The name of pizza branch
        :param region: The region of the branch
        :param toppings: The toppings of the pizza
        '''
        self.order_id = order_id
        self.branch_id = branch_id
        self.branch_name = branch_name
        self.region = region
        self.toppings = toppings
        self.order_date_time = datetime.now() #The time of the order
        self.status = "in progress" #The time of the order

    def complete_order(self):
        self.status = "completed"
        #print(f"Order {self.order_id} at {self.branch_name} ({self.region}) is completed.")


''' This calss builds a pizza branch and determines whether it is open or closed '''
class Branch:
    def __init__(self, branch_id, branch_name, region):
        self.branch_id = branch_id
        self.branch_name = branch_name
        self.region = region
        self.open = True

    def close(self):
        self.open = False
        #print(f"{self.branch_name} ({self.region}) branch is now closed.")
        
    def open(self):
        self.open = True
        #print(f"{self.branch_name} ({self.region}) branch is now open.")




# def simulate_pizza_order():
#     branches_list = [
#          {"id":1,"name":"GOLD PIZZA","region":"North"}
#         ,{"id":2,"name":"GOLD PIZZA","region":"Haifa"}
#         ,{"id":3,"name":"GOLD PIZZA","region":"Center"}
#         ,{"id":4,"name":"GOLD PIZZA","region":"Dan"}
#         ,{"id":5,"name":"GOLD PIZZA","region":"South"}
#         ,{"id":6,"name":"GOLD PIZZA","region":"North"}
#         ,{"id":7,"name":"GOLD PIZZA","region":"Haifa"}
#         ,{"id":8,"name":"GOLD PIZZA","region":"Center"}
#         ,{"id":9,"name":"GOLD PIZZA","region":"Dan"}
#         ,{"id":10,"name":"GOLD PIZZA","region":"South"}
#         ,{"id":11,"name":"GOLD PIZZA","region":"North"}
#         ,{"id":12,"name":"GOLD PIZZA","region":"Haifa"}
#         ,{"id":13,"name":"GOLD PIZZA","region":"Center"}
#         ,{"id":14,"name":"GOLD PIZZA","region":"Dan"}
#         ,{"id":15,"name":"GOLD PIZZA","region":"South"}
#         ,{"id":16,"name":"GOLD PIZZA","region":"North"}
#         ,{"id":17,"name":"GOLD PIZZA","region":"Haifa"}
#         ,{"id":18,"name":"GOLD PIZZA","region":"Center"}
#         ,{"id":19,"name":"GOLD PIZZA","region":"Dan"}
#         ,{"id":20,"name":"GOLD PIZZA","region":"South"}
#         ,{"id":21,"name":"GOLD PIZZA","region":"North"}
#         ,{"id":22,"name":"GOLD PIZZA","region":"Haifa"}
#         ,{"id":23,"name":"GOLD PIZZA","region":"Center"}
#         ,{"id":24,"name":"GOLD PIZZA","region":"Dan"}
#         ,{"id":25,"name":"GOLD PIZZA","region":"South"}
#         ,{"id":26,"name":"GOLD PIZZA","region":"North"}
#         ,{"id":27,"name":"GOLD PIZZA","region":"Haifa"}
#         ,{"id":28,"name":"GOLD PIZZA","region":"Center"}
#         ,{"id":29,"name":"GOLD PIZZA","region":"Dan"}
#         ,{"id":30,"name":"GOLD PIZZA","region":"South"}]
#     toppings = ["Pepperoni", "Mushrooms", "Onions", "Sausage", "Bacon", "Extra Cheese"]
#     order_id = 1
#     while True:
#         for _ in range(100):
#             branch = random.choice(branches_list)
#             if not Branch(branch["id"],branch["name"],branch["region"]).open:
#                 print(f"{branch['name']} ({branch['region']}) branch is closed, please select another branch.")
#                 continue

#             order_toppings = random.sample(toppings, k=random.randint(1, len(toppings)))
#             order = PizzaOrder(order_id, branch["id"], branch["name"], branch["region"], order_toppings)
#             print(f"Pizza order placed at {order.order_date_time} for branch {order.branch_name} ({order.region}) with toppings {order.toppings} and order ID: {order.order_id}.")
#             complete_time = random.randint(5, 30)
#             print(f"Order will be completed in {complete_time} minutes.")
#             #time.sleep(complete_time*60)
#             order.complete_order()
#             order_id += 1

# simulate_pizza_order()