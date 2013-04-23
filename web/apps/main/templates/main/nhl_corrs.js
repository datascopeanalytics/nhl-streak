var 
h = 6, // # playoff outcomes
w = 30, // maximum streak value

xsen = 20, // pixels wide per rect
ysen = 20, // pixels tall per rect

mrects = [], orects = [], wrects = [], 

margin = 40
;

var
height = 800,
width = 1500
;

var data = {{data_json}};
console.log(data);



// initialize rects for max point streak
for(var i = 0; i < h * w; i++){
  mrects.push({
      x: i % w,
      y: Math.floor(i / w),
      value: [Math.random()*256, Math.random()*128, Math.random()*128]
  });
}
//console.log(mrects)

// initialize rects for opening point streak
for(var i = 0; i < h * w; i++){
  orects.push({
      x: i % w,
      y: Math.floor(i / w),
      value: [Math.random()*128, Math.random()*256, Math.random()*128]
  });
}

// initialize rects for max win streak
for(var i = 0; i < h * w; i++){
  wrects.push({
      x: i % w,
      y: Math.floor(i / w),
      value: [Math.random()*128, Math.random()*128, Math.random()*256]
  });
}

var svg = d3.select('#svg_placer').append('svg').attr('height',height).attr('width',width);

var mstreak_rects = svg.append('g').attr('class','rects m');

var ostreak_rects = svg.append('g').attr('class','rects o')
    .attr('transform','translate(0,'+ (h*ysen + margin) + ')');
var wstreak_rects = svg.append('g').attr('class','rects w')
    .attr('transform','translate(0,'+(2*h*ysen + 2*margin)+')');

function rgb(array){
    return 'rgb(' + array.map(function(r){return Math.round(r);}).join(',')+')';
}
    
mstreak_rects
    .selectAll('rect')
    .data(mrects)
    .enter().append('rect')
    .attr('x',function(rect){return rect.x * xsen;})
    .attr('y',function(rect){return rect.y * ysen;})
    .attr('height',ysen)
    .attr('width',xsen)
    .style('fill',function(rect){return rgb(rect.value);});

ostreak_rects
    .selectAll('rect')
    .data(orects)
    .enter().append('rect')
    .attr('x',function(rect){return rect.x * xsen;})
    .attr('y',function(rect){return rect.y * ysen;})
    .attr('height',ysen)
    .attr('width',xsen)
    .style('fill',function(rect){return rgb(rect.value);});

wstreak_rects
    .selectAll('rect')
    .data(wrects)
    .enter().append('rect')
    .attr('x',function(rect){return rect.x * xsen;})
    .attr('y',function(rect){return rect.y * ysen;})
    .attr('height',ysen)
    .attr('width',xsen)
    .style('fill',function(rect){return rgb(rect.value);})