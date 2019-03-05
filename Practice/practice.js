var dataP = d3.json('data/practice.json'); // dataP - P is for promise. Meaning that it has promised to go and do something in the future.

console.log("Works?")

var drawChart = function(colorData){
  var width = 400;
  var height = 200;
  var barWidth = width/colorData.length;
  var padding_x = 5;
  var svg = d3.select('svg')
              .attr('width', width)
              .attr('height', height);

  svg.selectAll('rect')
     .data(colorData)
     .enter()
     .append('rect')
     .attr('x', function(d, i){
       return i * barWidth;
     })
     .attr('y', function(d){
       return height - d.num*10;
     })
     .attr('height', function(d){
       return d.num*10
     })
     .attr('width', width/colorData.length - padding_x)
     .attr('fill', function(d){
       return d.color;
     });
}

dataP.then(
  function(data){
    drawChart(data);
  },
  function(error){
    console.log(error);
  }
)
