/**
 * graphs for metals (& and energy!)
 */

d3.csv(DATA_FILE)
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
    const dateFormat = d3.timeParse("%B");
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let d of data){
        if (d.company !== COMPANY_NAME) continue;
        for (let month of months){
            if (!d[month]) continue;
            let y2018 = d.year === "2018" ? d[month] : 0;
            let y2019 = d.year === "2019" ? d[month] : 0;
            transformed.push(
                {month: dateFormat(month), year: d.year, y2018: y2018, y2019: y2019, val: y2018 || y2019}
            )
        }
    }
    return transformed
}

function makeMetalsGraphs(data){
    const dateFormat = d3.timeParse("%B");
    const metalsGraph = dc.compositeChart(GRAPH_ID);
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
            .group(y2018group, '2018 (avg)')
            .colors('red')
            .dashStyle([2,2]),
        dc.lineChart(metalsGraph)
            .dimension(dim)
            .group(y2019group, '2019')
            .colors('blue')
            .dashStyle([4,4])
            .defined(function(d){ console.log(d); return d.data.value }),
    ];

    metalsGraph
        .width(width)
        .height(height)
        .x(d3.scaleTime().domain([dateFormat('January'), dateFormat('December')]))
        .y(d3.scaleLinear().domain([1000,2300]))
        .yAxisLabel("Price")
        .legend(dc.legend().x((width-150)).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .compose(charts)
        .brushOn(false)
        .elasticY(true)
        .render();

    metalsGraph.xAxis().tickFormat(d3.timeFormat("%b"));
    metalsGraph.render();
}
