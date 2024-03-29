import os
import requests
from flask import Flask, session, request, jsonify, redirect, url_for, render_template
from predictor import get_prediction

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY') or os.urandom(16)
SERVER = "https://tradeserver3000.herokuapp.com"

DATA = {}


@app.route('/')
def home():
    session['state'] = 'started' if session.get('state') else 'starting'
    return render_template('home.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        r = requests.get(SERVER + '/position', params={'accountId': username})
        if r.status_code == 200:
            session['username'] = username
            session['balance'] = r.json()['balance']
            return redirect(url_for('home'))
        else:
            return render_template('Login.html', error=r.text)
    return render_template('Login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('balance', None)
    return redirect(url_for('home'))


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        r = requests.post(SERVER + '/create_account', params={'accountId': username})
        if r.status_code == 200:
            session['username'] = username
            r2 = requests.get(SERVER + '/position', params={'accountId': username})
            if r2.status_code == 200:
                session['balance'] = r2.json()['balance']
            return redirect(url_for('home'))
        else:
            return render_template('Signup.html', error=r.text)
    return render_template('Signup.html')


@app.route('/buy', methods=['POST'])
def buy():
    amount = request.form['amount']
    r = requests.post(SERVER + '/buy', params={'accountId': session['username'], 'amount': amount, 'stock': 'StockA'})
    if r.status_code == 200:
        print('successful')
    else:
        print(r.text)


@app.route('/update_balance', methods=['POST'])
def update_balance():
    session['balance'] = request.args['balance']
    return jsonify('balance update successful')


@app.route('/stocks')
def stocks():
    stocks_list = ['StockA', 'StockB']
    return render_template('stocks.html', stocks=stocks_list)


@app.route('/energy')
def energy():
    return render_template('energy.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/help')
def help():
    return render_template('help.html')


@app.route('/bp_info')
def bp_info():
    return render_template('bp_info.html')


@app.route('/active_info')
def active_info():
    return render_template('active_info.html')


@app.route('/enquest_info')
def enquest_info():
    return render_template('enquest_info.html')


@app.route('/exxon_info')
def exxon_info():
    return render_template('exxon_info.html')


@app.route('/shell_info')
def shell_info():
    return render_template('shell_info.html')


@app.route('/total_info')
def total_info():
    return render_template('total_info.html')


@app.route('/metals')
def metals():
    return render_template('metals.html')


@app.route('/riotinto_info')
def riotinto_info():
    return render_template('riotinto_info.html')


@app.route('/bhp_info')
def bhp_info():
    return render_template('bhp_info.html')


@app.route('/glencore_info')
def glencore_info():
    return render_template('glencore_info.html')


@app.route('/valesa_info')
def valesa_info():
    return render_template('valesa_info.html')


@app.route('/china_info')
def china_info():
    return render_template('china_info.html')

@app.route('/wtlof')
def wtlof():
    return render_template('wtlof.html')


@app.route('/comingsoon')
def coming_soon():
    return render_template('comingsoon.html', notReady=True)


def update_data(prices):
    for stock, price in prices.items():
        if stock in DATA:
            DATA[stock].append(price)
            if len(DATA[stock]) > 180:  # this data limit ideally should match the limit in the front end
                DATA[stock].pop(0)
        else:
            DATA[stock] = [price]


@app.route('/getPrediction', methods=['POST'])
def make_prediction():
    prices = request.get_json()
    update_data(prices)
    predictions = get_prediction(prices, DATA)
    return jsonify(render_template('predictions.html', predictions=predictions))


if __name__ == '__main__':
    app.run(debug=True)
