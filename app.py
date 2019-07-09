from flask import Flask, render_template
from predictor import random_price, make_recommendation

app = Flask(__name__)


@app.route('/')
def home():
    my_price = random_price()
    recommendation = make_recommendation(my_price)
    return render_template('home.html', price=my_price, rec=recommendation)


if __name__ == '__main__':
    app.run()
