import random
from datetime import datetime

class PizzaOrder:
    def __init__(self, branch, toppings, tip):
        self.time_of_order = datetime.now()
        self.branch = branch
        self.toppings = toppings
        self.tip = tip

class Branch:
    def __init__(self, name):
        self.name = name
        self.open = True

    def close(self):
        self.open = False
        print(f"{self.name} branch is now closed.")
        
    def open(self):
        self.open = True
        print(f"{self.name} branch is now open.")

def simulate_pizza_order():
    branches = ["Downtown", "Uptown", "Midtown"]
    toppings = ["Pepperoni", "Mushrooms", "Onions", "Sausage", "Bacon", "Extra Cheese"]
    while True:
        for _ in range(100):
            branch = random.choice(branches)
            if not Branch(branch).open:
                print(f"{branch} branch is closed, please select another branch.")
                continue
            order_toppings = random.sample(toppings, k=random.randint(1, len(toppings)))
            tip = round(random.uniform(0, 10), 2)
            order = PizzaOrder(branch, order_toppings, tip)
            print(f"Pizza order placed at {order.time_of_order} at {order.branch} branch with toppings {order.toppings} and a tip of ${order.tip}.")
            complete_time = random.randint(5, 30)
            print(f"Order will be completed in {complete_time} minutes.")
            #time.sleep(complete_time*60)
            print(f"Order completed at {datetime.now()}.")

simulate_pizza_order()
