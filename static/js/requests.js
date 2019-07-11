const url = "https://tradeserver3000.herokuapp.com";


function getPrices(callback=function(){}){
    fetch(url+'/prices')
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
//        console.log(myJson);
        callback(myJson)
    })
    .catch(function(error) {
        console.error("error occurred in getPrices:", error);
    });
}

function getOptions(callback=function(){}){
    fetch(url+'/options')
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        console.log(myJson);
        callback(myJson)
    })
    .catch(function(error) {
        console.error("error occurred in getOptions:", error);
    });
}

function getPosition(accountId, callback=function(){}){
    fetch(url+`/position?accountId=${accountId}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        console.log(myJson);
        callback(myJson)
    })
    .catch(function(error) {
        console.error("error occurred in getPosition:", error);
    });
}

function getTrades(accountId, callback=function(){}){
    fetch(url+`/trades?accountId=${accountId}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        console.log(myJson);
        callback(myJson)
    })
    .catch(function(error) {
        console.error("error occurred in getTrades:", error);
    });
}

function createAccount(accountId, callback=function(){}){
    fetch(url+`/create_account?accountId=${accountId}`, {method: 'POST'})
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        console.log(myJson);
        callback(myJson)
    })
    .catch(function(error) {
        console.error("error occurred in createAccount:", error);
    });
}

function buy(accountId, stock, amount, callback=function(){}){
    fetch(url+`/buy?accountId=${accountId}&stock=${stock}&amount=${amount}`, {method: 'POST'})
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        console.log(myJson);
        callback(myJson)
    })
    .catch(function(error) {
        console.error("error occurred in buy:", error);
    });
}

function sell(accountId, stock, amount, callback=function(){}){
    fetch(url+`/sell?accountId=${accountId}&stock=${stock}&amount=${amount}`, {method: 'POST'})
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        console.log(myJson);
        callback(myJson)
    })
    .catch(function(error) {
        console.error("error occurred in sell:", error);
    });
}

function postPrice(priceJson, callback=function(){}){
    price = priceJson['StockA'];
    console.log(priceJson, price);
    fetch(`/getPrediction?prices=${price}`, {method: 'POST'})
    .then(function(response) {
        console.log(response);
        return response.json()
    })
    .then(function(myJson) {
        console.log(myJson);
        $('#predictionBox').html(myJson);
        callback(myJson)
    })
    .catch(function(error) {
        console.error("error occurred in postPrice:", error);
    });
}
