$('#welcome').fadeOut(4000);


function postPricesWithCallback(priceJson){
    postPrices(priceJson, function (prediction) {
        $('#predictionBox').html(prediction);
    })
}

setInterval(function(){
    getPrices(postPricesWithCallback)
}, 5000);
