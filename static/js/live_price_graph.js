const livePriceGraph = dc.compositeChart("#price_graph");
const livePrices = {};
const livePricesDataXF = crossfilter();
const LPMaximumTicks = 300;
const LPWidth = 600;
const LPHeight = 400;


function makeLPGraphs() {

    const styling = {
        StockA: {color: 'red', dash: [2,2]},
        StockB: {color: 'blue', dash: [5,5]},
        defaults: {color: 'black', dash:[1,0]},
    };

    const dim  = livePricesDataXF.dimension(dc.pluck('tick'));

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
        .width(LPWidth)
        .height(LPHeight)
        .x(d3.scaleLinear().domain([0,LPMaximumTicks]))
        .y(d3.scaleLinear().domain([2,6]))
        .yAxisLabel("Price")
        .legend(dc.legend().x((LPWidth-130)).y(30).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .compose(charts)
        .brushOn(false)
        .render();

    livePriceGraph.xAxis().ticks(0);
    livePriceGraph.render();
}


function updateLivePriceGraph(prices) {
    const create = !Object.keys(livePrices).length;

    for (let stock in prices) {
        if (stock in livePrices) {
            livePrices[stock].push(prices[stock]);
            if (livePrices[stock].length > (LPMaximumTicks - 20)) livePrices[stock].shift();
        } else livePrices[stock] = [prices[stock]];
    }
    const stocks = Object.keys(livePrices);

    livePricesDataXF.remove();

    for (let stock in livePrices) {
        const data = livePrices[stock].map(function (d, i) {
            let row = {};
            for (let name of stocks) row[name] = 0;
            row['tick'] = i;
            row[stock] = d;
            return row
        });
        livePricesDataXF.add(data);
    }
    if (create) makeLPGraphs();
    livePriceGraph.redraw();
}


setInterval(function () {
    getPrices(updateLivePriceGraph);
}, 2000);