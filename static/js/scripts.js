if ($('#welcome').hasClass('starting')) {
    $('#welcome').fadeOut(500);
}
else {
    $('#welcome').fadeOut(500);
}


function postPricesWithCallback(priceJson){
    postPrices(priceJson, function (prediction) {
        $('#predictionBox').html(prediction);
    })
}

setInterval(function(){
    getPrices(postPricesWithCallback)
}, 5000);


/* ====== BUY & SELL ====== */
