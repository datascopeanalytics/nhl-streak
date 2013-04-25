var 
h = 6, // # playoff outcomes
w = 30, // maximum streak value

xsen = 20,
ysen = 20,

xlen = 500, // pixels wide per rect
ylen = 125, // pixels tall per rect

mrects = [], orects = [], wrects = [], 

border = 1,
margin = 40
;

var
height = 800,
width = 1500,

r = 0,
g = 0,
b = 0
;

var data = {{hist_data}};
console.log(data);

m_data = data['mdict'];
o_data = data['odict'];
w_data = data['mdict'];

// initialize rects for max point streak
w = 35;
for(var i = 0; i < h * w; i++){
    mx = i % w;
    my = Math.floor(i/w);

    if (m_data[mx] != null && m_data[mx][my] != null){
	mc = m_data[mx][my]['adj_count'];
	labels = m_data[mx][my]['string'];
    }
    else{
	mc = 0;
	labels = [];
    }
    mrects.push({
	x: mx,
	y: my,
	value: [r,mc*256,b],
	labels: labels,
	norm: w
  });
}
//console.log(mrects)

// initialize rects for opening point streak
w=16;
for(var i = 0; i < h * w; i++){
    mx = i % w;
    my = Math.floor(i/w);
    
    if (o_data[mx] != null && o_data[mx][my] != null){
	mc = o_data[mx][my]['adj_count'];
	labels = o_data[mx][my]['string'];
    }
    else{
	mc = 0;
	labels = [];
    }
    orects.push({
	x: mx,
	y: my,
	value: [mc*256,g,b],
	labels: labels,
	norm: w
  });
}

// initialize rects for max win streak
w=17;
for(var i = 0; i < h * w; i++){
    mx = i % w;
    my = Math.floor(i/w);
    
    if (w_data[mx] != null && w_data[mx][my] != null){
	mc = w_data[mx][my]['adj_count'];
	labels = w_data[mx][my]['string'];
    }
    else{
	mc = 0;
	labels = [];
    }
    wrects.push({
	x: mx,
	y: my,
	value: [r,g,mc*256],
	labels: labels,
	norm: w
  });
}

var svg = d3.select('#svg_placer').append('svg').attr('height',height).attr('width',width);

var mstreak_rects = svg.append('g').attr('class','rects m');

var ostreak_rects = svg.append('g').attr('class','rects o')
    .attr('transform','translate(0,'+ (ylen + margin) + ')');
var wstreak_rects = svg.append('g').attr('class','rects w')
    .attr('transform','translate(0,'+(2*ylen + 2*margin)+')');

function rgb(array){
    return 'rgb(' + array.map(function(r){return Math.round(r);}).join(',')+')';
}
    
mstreak_rects
    .selectAll('rect')
    .data(mrects)
    .enter().append('rect')
    .attr('x',function(rect){return rect.x*xlen/rect.norm+border;})
    .attr('y',function(rect){return (5-rect.y)*ylen/6+border;})
    .attr('height',ylen/6-border)
    .attr('width',function(rect){return xlen/rect.norm-border;})
    .style('fill',function(rect){return rgb(rect.value);});

ostreak_rects
    .selectAll('rect')
    .data(orects)
    .enter().append('rect')
    .attr('x',function(rect){return rect.x*xlen/rect.norm+border;})
    .attr('y',function(rect){return (5-rect.y)*ylen/6+border;})
    .attr('height',ylen/6-border)
    .attr('width',function(rect){return xlen/rect.norm-border;})
    .style('fill',function(rect){return rgb(rect.value);});

wstreak_rects
    .selectAll('rect')
    .data(wrects)
    .enter().append('rect')
    .attr('x',function(rect){return rect.x*xlen/rect.norm+border;})
    .attr('y',function(rect){return (5-rect.y)*ylen/6+border;})
    .attr('height',ylen/6-border)
    .attr('width',function(rect){return xlen/rect.norm-border;})
    .style('fill',function(rect){return rgb(rect.value);});

