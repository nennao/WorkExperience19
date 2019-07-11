d3.csv("/static/data/metals_data.csv")
  .then(function(data) {
      data = transformData(data);
      console.log(data);
      makeMetalsGraphs(data)
  })
  .catch(function(error){
     console.log('an error occurred in metals_graphs:', error)
  });


function transformData(data){
    const transformed = [];
    const monthMap = {January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11}
    for (let d of data){
        if (d.company !== METALS_NAME) continue;
        for (let month of Object.keys(monthMap)){
            if (!d[month]) continue;
            let y2018 = d.year === "2018" ? d[month] : 0;
            let y2019 = d.year === "2019" ? d[month] : 0;
            transformed.push(
                {month: monthMap[month], year: d.year, y2018: y2018, y2019: y2019}
            )
        }
    }
    return transformed
}

function makeMetalsGraphs(data){
    const metalsGraph = dc.compositeChart(METALS_ID);
    const metalsXF = crossfilter();
    const width = 700;
    const height = 360;

    metalsXF.add(data);
    const dim  = metalsXF.dimension(dc.pluck('month'));
    const y2018group = dim.group().reduceSum(dc.pluck('y2018'));
    const y2019group = dim.group().reduceSum(dc.pluck('y2019'));

    const charts = [
        dc.lineChart(metalsGraph)
            .dimension(dim)
            .group(y2018group, '2018')
            .colors('red')
            .dashStyle([2,2]),
        dc.lineChart(metalsGraph)
            .dimension(dim)
            .group(y2019group, '2019')
            .colors('blue')
            .dashStyle([4,4]),
    ];

    metalsGraph
        .width(width)
        .height(height)
        .x(d3.scaleLinear().domain([0,11]))
        .yAxisLabel("Price")
        .legend(dc.legend().x((width-150)).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .compose(charts)
        .brushOn(false)
        .elasticY(true)  // TODO figure out max and min domain
        .render();
}
