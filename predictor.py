from random import random


def random_price():
    unrounded = random() * 10
    return round(unrounded, 2)


def make_recommendation(price):
    if price > 1000:
        return "this is good, you should sell...but it's up to you"
    else:
        return "this is bad, don't sell"
