if ($('#welcome').hasClass('starting')) {
    $('#welcome').fadeOut(8000);
}
else {
    $('#welcome').fadeOut(2000);
}


function postPricesWithCallback(priceJson){
    postPrices(priceJson, function (prediction) {
        $('#predictionBox').html(prediction);
    })
}

setInterval(function(){
    getPrices(postPricesWithCallback)
}, 5000);
