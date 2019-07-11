const livePriceGraph = dc.compositeChart("#price_chart");
const livePrices = {};
const ndx = crossfilter();

const styling = {
    StockA: {color: 'red', dash: [2,2]},
    StockB: {color: 'blue', dash: [5,5]},
    defaults: {color: 'black', dash:[1,0]},
};


function makeGraphs() {

    const dim  = ndx.dimension(dc.pluck('tick'));

    const charts = [];
    for (let stock of Object.keys(livePrices)) {
        let group = dim.group().reduceSum(dc.pluck(stock));
        let color = styling[stock] ? styling[stock]['color'] : styling['defaults']['color'];
        let dash = styling[stock] ? styling[stock]['dash'] : styling['defaults']['dash'];
        charts.push(
            dc.lineChart(livePriceGraph)
                .dimension(dim)
                .group(group, stock)
                .colors(color)
                .dashStyle(dash)
        )
    }

    livePriceGraph
        .width(1200)
        .height(560)
        .x(d3.scaleLinear().domain([0,300]))
        .y(d3.scaleLinear().domain([3,6]))
        .yAxisLabel("Price")
        .legend(dc.legend().x(1000).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .compose(charts)
        .brushOn(false)
        .elasticY(true)
        .render();

    livePriceGraph.xAxis().tickFormat(function() { return ""; });
    // livePriceGraph.xAxis().tick(0);
    livePriceGraph.render();
}


// setInterval(function () {
//     getPrices(updateLivePriceGraph)
// }, 2000);


function updateLivePriceGraph(prices0) {
    const create = !Object.keys(livePrices).length;

    const prices = prices0;  // TODO remove this after testing
    prices['StockB'] = +prices['StockA'] + +(0.2 + Math.random() * 0.3).toFixed(3);
    prices['StockC'] = +prices['StockA'] + +(-0.1 - Math.random() * 0.3).toFixed(3);


    for (let stock in prices) {
        if (stock in livePrices) {
            livePrices[stock].push(prices[stock]);
            if (livePrices[stock].length > 250) livePrices[stock].shift();
        } else livePrices[stock] = [prices[stock]];
    }
    const stocks = Object.keys(livePrices);

    ndx.remove();

    for (let stock in livePrices) {
        const data = livePrices[stock].map(function (d, i) {
            let row = {};
            for (let name of stocks) row[name] = 0;
            row['tick'] = i;
            row[stock] = d;
            return row
        });
        ndx.add(data);
    }
    if (create) makeGraphs();
    livePriceGraph.redraw();
}
