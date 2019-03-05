var csvColors = d3.csv('data/practice.csv');
var jsonColors = d3.json('data/practice.json')
var type_colors = [csvColors, jsonColors]
var width = 400;
var height = 600;

var types = ['.csv', '.json']
var svgs = [];

types.forEach(function(d){
  var svg = d3.select(d)
              .attr('width', width + 400)
              .attr('height', height)
              .style('display', 'block');

  svgs.push(svg);
})

var quantifier = 50; // How much bigger the bar became.
var padding = 10; // Bar Padding
var y_offset = 15; // Text's Y Offset
var y_padding = 3; // Text's Padding Relative To The Top Of The Bar
var x_offset = 5; // Text's X Offset Based On Its Size
var stroke = 3; // Size of Bar's Borders
var legend_offset_x = 20; // The X Offset Of The Legend
var legend_offset_y = 20; // The Y Offset Of The Legend
var legend_padding_y = 40; // The Padding Of Each Element Of The Legend

var parser = function(colorData, svg){
  svg.selectAll('rect')
  .data(colorData)
  .enter()
  .append('rect')
  .attr('fill', function(data){
    return data.color;
  })
  .attr('x', function(data, i){
    return i * width/colorData.length;
  })
  .attr('y', function(data){
    return height - data.num * quantifier;
  })
  .attr('height', function(data){
    return data.num * quantifier;
  })
  .attr('width', width/colorData.length - (padding - stroke))
  .attr('stroke-width', stroke)
  .attr('stroke', 'black');

  svg.selectAll('text')
     .data(colorData)
     .enter()
     .append('text')
     .attr('fill', 'white')
     .attr('x', function(data, i){
       return (i * width/colorData.length) + ((width/colorData.length - padding)/2) - x_offset;
     })
     .attr('y', function(data){
       return (height - data.num * quantifier) + (y_offset + y_padding);
     })
     .text(function(data){
       return data.num;
     })

  svg.selectAll('rect.legend')
      .data(colorData)
      .enter()
      .append('rect')
      .attr('class', 'legend')
      .attr('x', function(d){
        return width + legend_offset_x;
      })
      .attr('y', function(d, i){
        return (i * legend_padding_y) + legend_offset_y;
      })
      .attr('width', 40)
      .attr('height', 30)
      .attr('fill', function(d){
        return d.color;
      });

  svg.selectAll('text.legend')
         .data(colorData)
         .enter()
         .append('text')
         .attr('class', 'legend')
         .attr('x', function(d){
           return width + (legend_offset_x * 2) + 40
         })
         .attr('y', function(d, i){
           return (i * legend_padding_y) + (legend_offset_y * 2);
         })
         .text(function(d){
           return d.color;
         });
}

type_colors.forEach(function(d, i){
  d.then(function(data){
    parser(data, svgs[i])
  },
  function(error){
    console.log(error);
  })
})
