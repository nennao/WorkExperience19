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

function postPrices(priceJson, callback=function(){}){
    fetch('/getPrediction', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, method: 'POST', body: JSON.stringify(priceJson)
    })
    .then(function (response) {
        return response.json()
    })
    .then(function(myJson) {
        callback(myJson)
    })
    .catch(function(error) {
        console.error("error occurred in postPrice:", error);
    });
}

function updateBalance(balance, callback=function(){}){
    fetch(`/update_balance?balance=${balance}`, {method: 'POST'})
    .then(function (response) {
        return response.json()
    })
    .then(function(myJson) {
        console.log(myJson);
        callback(myJson)
    })
    .catch(function(error) {
        console.error("error occurred in postPrice:", error);
    });
}
