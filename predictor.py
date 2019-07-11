from random import random


def random_price():
    unrounded = random() * 1000
    return round(unrounded, 2)


def make_recommendation(price):
    if price > 1000:
        return "this is good, you should sell...but it's up to you"

    elif price == 1000:
        return "sell or buy, you decide"
    else:
        return "this is bad, don't sell...although it's all in your hands"


def get_prediction(price, all_data):
    prediction = f'this is the prediction for {price}'
    return prediction