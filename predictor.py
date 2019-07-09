from random import random


def random_price():
    unrounded = random() * 1000
    return round(unrounded, 2)


def make_recommendation(price):
    if price > 1000:
        return "this is good, you should sell"
    else:
        return "this is bad, don't sell"
