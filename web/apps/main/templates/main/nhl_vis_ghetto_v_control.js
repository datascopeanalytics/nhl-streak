//$(function(){
// this is a django template. we can use the django variables to
// extract data. weeeeee!
var data = {{data_json}};

//set static values for background histogram
var lowest_streak = 0;
var highest_streak = 100;

// These numbers must change when we manipulate the slider bar
var start_year = 1960;
var final_year = 2012;
var lowest_sel_streak = 0;
var highest_sel_streak = 16;

var results_combined = [];
var results_all = [];

// Remember the law of 2005
calculate_data();

//width and height
var w = 500;
var h = 350;
var r = 90;

var padding = 10;
var topPadding = 50;
var allPadding = 70;
var selPadding = 50;

var dur = 300; //transition duration

//create svg element
var svg = d3.select("#svg_placer")
    .append("svg")
    .attr("width", 2*w)
    .attr("height", h);

var color = d3.scale.ordinal()
    .range(["gray","black","orange","yellow","green","red"]); 
//    .range(["red","black","orange","yellow","green","gray"]);

var arc = d3.svg.arc()
    .outerRadius(r)
    .innerRadius(r*.65);

var pie = d3.layout.pie()
    .value(function(d) { return d; })
    .sort(function(a,b) {
	return 1;});

var donut_g = svg.append("g")
    .attr("class", "donut")
    .attr("transform", "translate("+(w+r*1.2+40)+","+(r*1.2+40)+")");

transition();

//initiate slider jquery objects
$("#streak_slider").slider({
    range: true,
    min: 0,
    max: 16,
    step: 1,
    values: [ lowest_sel_streak, highest_sel_streak ],
    slide: function(event, ui) {
	lowest_sel_streak = ui.values[0];
	highest_sel_streak = ui.values[1];
	transition();
    }	
});

$("#year_slider").slider({
    range: true,
    min: 1960,
    max: 2012,
    step: 1,
    values: [ start_year, final_year ],
    slide: function(event, ui){
	start_year = ui.values[0];
	final_year = ui.values[1];
	transition();
    }	
});


function transition (){

    //recalculate the data based on the slider inputs
    calculate_data();
   // setScale();

    var allScale = d3.scale.linear()
    .domain([0,d3.max(results_all)])
    .range([h - padding, topPadding]);
    //console.log("");
    //all_bars display the #of team*seasons to finish at that level
    //of playoff, regardless of opening streak (baseline)
    var all_bars = svg.selectAll(".all_rect")
	.data(results_all);

    all_bars.enter().append("rect");

    all_bars.transition().duration(dur)
	.attr("class","all_rect")
	.attr("x", function(d,i) {
	    return i*(w/results_all.length);})
	.attr("y",function(d){return allScale(d);})
	.attr("width",w/results_all.length-allPadding)
	.attr("height",function(d){return h - allScale(d) - padding;})
	.style("fill","rgb(92,92,92)");

    var sel_bars = svg.selectAll(".sel_rect")
	.data(results_combined);

    sel_bars.enter().append("rect");

    //set attributes of sel_bars
    sel_bars.transition().duration(dur)
	.attr("class","sel_rect")
	.attr("x", function(d,i) {
	    return i*(w/results_combined.length)+selPadding/2;})
	.attr("y",function(d){return allScale(d);})
	.attr("width",w/results_combined.length-selPadding)
	.attr("height",function(d){return h - allScale(d) - padding;})
	//.style("fill","orange");
	.style("fill",function(d,i){return color(i)}); 

    transition_labels(allScale);

   
    //transition the donut!
    var donut = donut_g.selectAll(".arc")
    	.data(pie(results_combined))
	.each(function(d){this._current = d}); 
	
    donut.enter().append("g")
    	.attr("class","arc");

    donut.append("path")
    	.style("fill", function(d,i) {return color(i)})
    	.attr("d", arc);

    // donut.append("text")
    // 	.attr("transform", function(d) {
    // 	    d.outerRadius = r+150;
    // 	    d.innerRadius = r+45;
    // 	    return "translate(" + arc.centroid(d) + ")";
    // 	})
    // 	.attr("text-anchor","middle")
    // 	.style("fill","teal")
    // 	.style("font","bold 12px Arial")
    // 	.text("O HAI");

    donut.transition().duration(dur)
    	.attrTween("d", arcTween);

};
   
function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
	return arc(i(t));
    };
}

function transition_labels(allScale){

    var sel_labels = svg.selectAll(".sel_text")
	.data(results_combined);

    sel_labels.enter().append("text")
    
    sel_labels.transition().duration(dur)
	.attr("class","sel_text")
	.text(function (d) {return d;}) 
	.attr("x",function(d,i){ return i*(w/results_all.length)+(w/results_combined.length-selPadding)/2+selPadding/2;})
	.attr("y",function(d){return allScale(d)-1;})
	.attr("font-family","sans-serif")
	.attr("font-size","18px")
	.attr("fill","red")
	.attr("text-anchor","middle");

    var all_labels = svg.selectAll(".all_text")
	.data(results_all);

    all_labels.enter().append("text")

    all_labels.transition().duration(dur)
	.attr("class","all_text")
	.text(function (d) {return d;})
	.attr("x", function(d,i) {
	    return i*(w/results_all.length)+(w/results_all.length-allPadding)/2;})
	.attr("y",function(d){return allScale(d)-1;})
	.attr("font-family","sans-serif")
	.attr("font-size","12px")
	.attr("fill","rgb(92,92,92)")
	.attr("text-anchor","middle");

};//transition_labels

function calculate_data(){
    console.log("~~~~ new calculate_data ~~~~");
    for(i=0;i<6;i++) {
	results_combined[i] = 0;
	results_all[i] = 0;
    }

    var year_range = d3.range(start_year, final_year + 1);
    var total_teams = 0;
    var in_range = 0;
    _.each(year_range,function(year){
	if (year != 2005){
	    _.each(data[year], function(team){
		if (team.streak >= lowest_sel_streak && 
		    team.streak <= highest_sel_streak){
		    // for (var k = team.playoffs; k >= 0; k--){
		    //     results_combined[k] += 1;
		    // }
		    results_combined[team.playoffs] += 1;
		    in_range +=1;
		}
		if (team.streak >= lowest_streak && 
		    team.streak <= highest_streak){
		    // for (var k = team.playoffs; k >= 0; k--){
		    //     results_all[k] += 1;
		    // }
		    results_all[team.playoffs] += 1;
		    total_teams += 1;
		}
		
	    });
	}

    });

	var num_playoffs = in_range-results_combined[0];
	var conf_finals = results_combined[5]+results_combined[4]
	    +results_combined[3];
	var num_cupfs = results_combined[5]+results_combined[4];
	var num_cup =results_combined[5];
	var chance_playoffs =num_playoffs/in_range;
	var chance_cf = conf_finals/in_range;
	var chance_cupfinals = num_cupfs/in_range;
	var chance_cup = num_cup/in_range;
	
	console.log("Seasons: "+start_year+"-"+final_year);
	console.log("Total team*years: "+total_teams);
	console.log("For a streak length: "+lowest_sel_streak+"-"
	    +highest_sel_streak);
	console.log("Total team*years in streak range:"+in_range);
	console.log("Number in playoffs: "+num_playoffs);
	console.log("Chance of playoffs: "+chance_playoffs);
	console.log("Chance of conf. finals: "+chance_cf);
	console.log("Chance cup finals: "+chance_cupfinals);
	console.log("Chance of Stanley Cup: "+chance_cup);

  
}

