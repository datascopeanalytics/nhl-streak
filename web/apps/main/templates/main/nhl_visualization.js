$(function(){
    // this is a django template. we can use the django variables to
    // extract data. weeeeee!
    var data = {{data_json}};
    console.log(data);
    var percentage = d3.format("%");
    
    //set static values for background histogram
    var lowest_streak = 0;
    var highest_streak = 16;
    
    // These numbers must change when we manipulate the slider bar
    var start_year = 1940;
    var final_year = 2012;
    var lowest_sel_streak = 0;
    var highest_sel_streak = 16;
    var games_in_range = 0;
    
    // Arrays to hold & access data of interest
    var results_combined = [];
    var results_all = [];
    var playoff_percentage = [];
    
    // Remember the law of 2005
    calculate_data();
    
    //width and height
    var w = 500;
    var h = 350;
    var r = 80;
    
    // padded like bike shorts
    var padding = 10;
    var topPadding = 50;
    var allPadding = 70;
    var selPadding = 50;

    var dur = 300; //transition duration
    
    //blackhawks colors
    var color = d3.scale.ordinal()
	.range(["white", "black", "orange", "yellow", "green", "red"]);
    
    // vars for statsboxx2000
    var chance_playoffs = 0;
    var chance_cf = 0;
    var chance_cupfinals = 0;
    var chance_cup = 0;
    var stats_strings = [];
    
    //create svg elements
    var svg = d3.select("#svg_placer")
	.append("svg")
	.attr("width", 2 * w)
	.attr("height", h);

    
    var slider_svg = d3.select("#sliders")
	.append("svg")
	.attr("id","slider_svg")
	.attr("width", w)
	.attr("height", h/2);

    var streak_scale = d3.scale.linear()
	.domain([lowest_streak, highest_streak])
	.range([$('#streak_holder').width() - $('#streak_slider').width() +padding , $('#streak_holder').width() + padding]);
    var y_streak_scale = $("#streak_holder").css("margin-top");
    
    y_streak_scale = parseInt(y_streak_scale)*.7;
    console.log("y_streak_scale: ", y_streak_scale);

    var streak_points =     [{val:0,label:"0"},
			     {val:2,label:"•"},
			     {val:4,label:"4"},
			     {val:6,label:"•"},
			     {val:8,label:"8"},
			     {val:10,label:"•"},
			     {val:12,label:"12"},
			     {val:14,label:"•"},
			     {val:16,label:"16"},];
    
    var streak_axis = slider_svg.selectAll('.streak_text')
	.data(streak_points)
	.enter().append('text')
	.text(function(d){return d.label;})
	.attr('x',function(d){return streak_scale(d.val)})
	.attr('y',y_streak_scale)
	.attr('text-anchor','middle')
	.attr('font-size','14px');
    
   
    var year_scale = d3.scale.linear()
	.domain([start_year,final_year])
	.range([$('#season_holder').width() - $('#season_slider').width() + padding, $('#season_holder').width() + padding]);

    var y_year_scale = 8 +//parseInt($("#streak_holder").height()) + 
	parseInt($("#season_holder").css("margin-top"))*1.7;

    console.log("y_year_scale: ", y_year_scale,parseInt($("#streak_slider").height()));

    var year_points = [
	{val:1940,label:"'40"},
	{val:1945,label:"•"},
	{val:1950,label:"'50"},
	{val:1955,label:"•"},
	{val:1960,label:"'60"},
	{val:1965,label:"•"},
	{val:1970,label:"'70"},
	{val:1975,label:"•"},
	{val:1980,label:"'80"},
	{val:1985,label:"•"},
	{val:1990,label:"'90"},
	{val:1995,label:"•"},
	{val:2000,label:"'00"},
	{val:2005,label:"•"},
	{val:2010,label:"'10"},];

    var year_axis = slider_svg.selectAll('.year_text')
	.data(year_points).enter().append('text')
	.text(function(d){return d.label})
	.attr('x',function(d){return year_scale(d.val)})
	.attr('y',y_year_scale)
	.attr('text-anchor','middle')
	.attr('font-size','14px');

    var statsbox_div = d3.select("#stats_box")
	.append("div")
	.attr("id","statsbox_div")
	.attr("width",w/1.2)
	.attr("height",h/2);
    
    //initiate some pie things
    var arc = d3.svg.arc()
	.outerRadius(r)
	.innerRadius(r * .65);
    
    var text_arc = d3.svg.arc()
	.outerRadius(r + 40)
	.innerRadius(r);
    
    var pie = d3.layout.pie()
	.value(function(d) {
	    return d;
	})
	.sort(function(a, b) {
	    return 1;
	});
    
    var donut_g = svg
	.append("g")
	.attr("class", "donut")
	.attr("transform", "translate(" + (w/1.27 + r * 1.2) + "," + (r * 1.2 + 40) + ")");
    
    var donut = donut_g.selectAll("g.arc")
	.data(pie(results_combined))
	.enter().append('g')
	.attr("class",arc);
    
    donut.append("path")
	.attr("class", "arc_path")
	.style("fill", function(d, i) {
	    return color(i)
	})
	.attr("d", arc)
	.each(function(d) {
	    this._current = d
	});
    
    donut.append("text")
	.attr("text-anchor","middle")
	.attr("class", "arc_text")
	.each(function(d) {
	    //console.log("inside text: ", text_arc.centroid(d));
	    this._current = text_arc.centroid(d);
	});
    
    //call "transition" to update & draw charts
    transition();

    //initiate slider jquery objects
    $("#streak_slider").slider({
	range: true,
	min: 0,
	max: 16,
	step: 1,
	values: [lowest_sel_streak, highest_sel_streak],
	slide: function(event, ui) {
	    lowest_sel_streak = ui.values[0];
	    highest_sel_streak = ui.values[1];
	    transition();
	}//listens for slider event & updates data arrays
    });

    $("#season_slider").slider({
	range: true,
	min: 1960,
	max: 2012,
	step: 1,
	values: [start_year, final_year],
	slide: function(event, ui) {
	    start_year = ui.values[0];
	    final_year = ui.values[1];
	    transition();
	}//listens for slider event & updates data arrays
});
    
    
    function transition() {
	
	//recalculate the data based on the slider inputs
	calculate_data();
	
	var allScale = d3.scale.linear()
	    .domain([0, d3.max(results_all)])
	    .range([h - padding, topPadding]);

	var x_axis = [[padding,-1],[w - padding,-1]];

	var sep_line = d3.svg.line()
	    .x(function(d) {
		console.log("in line:",d);
		return d[0];})
	    .y(function(d) {return allScale(d[1]);});
	
	svg.selectAll(".xaxis")
	    .data([x_axis])
	    .enter().append("path")
	    .attr("d",sep_line)
	    .attr("class","xaxis");

	//all_bars display the #of team*seasons to finish at that level
	//of playoff, regardless of opening streak (baseline)
	var all_bars = svg.selectAll(".all_rect")
	    .data(results_all);
	
	all_bars.enter().append("rect");
	
	all_bars.transition().duration(dur)
	    .attr("class", "all_rect")
	    .attr("x", function(d, i) {
		return i * (w / results_all.length)+padding;
	    })
	    .attr("y", function(d) {
		return allScale(d);
	    })
	    .attr("width", w / results_all.length - allPadding)
	    .attr("height", function(d) {
		return h - allScale(d) - padding;
	    })
	    .style("fill", "rgb(92,92,92)");
	
	var sel_bars = svg.selectAll(".sel_rect")
	    .data(results_combined);
	
	sel_bars.enter().append("rect");
	
	//set attributes of sel_bars
	sel_bars.transition().duration(dur)
	    .attr("class", "sel_rect")
	    .attr("x", function(d, i) {
		return i * (w / results_combined.length) + selPadding / 2+padding;
	    })
	    .attr("y", function(d) {
		return allScale(d);
	    })
	    .attr("width", w / results_combined.length - selPadding)
	    .attr("height", function(d) {
		return h - allScale(d) - padding;
	    })  
	    .style("fill", function(d, i) {
		return color(i)
	    });
	
	transition_labels(allScale);
	
	
	//transition the donut!
	var arcs = donut_g.selectAll(".arc_path")
	    .data(pie(results_combined));
	
	arcs.transition().duration(dur)
	    .attrTween("d", arcTween);
	
	var arc_text = donut_g.selectAll(".arc_text")
  	    .data(pie(results_combined));
	
	arc_text.transition().duration(dur)
	    .attr("transform", function(d,i) {                
		// console.log("Eating donuts: ",d);	  	
		return "translate(" + text_arc.centroid(d) + ")";
	    })
	.text(function(d,i){return percentage(playoff_percentage[i])});
	
	
	
    //statsboxxx 
	// string the data
	ystring = year_string();
	sstring = streak_string();

	stats_strings = [
	    {
		str: ystring,
		cls: "stats_lang"
	    },
	    {
		str: sstring,
		cls: "stats_lang"
	    },
	    {
		str: chance_playoffs+"%",
		cls: "percent"
	    },
	    {
		str: "made the playoffs",
		cls: "action"
	    },
	    {
		str: chance_cupfinals+"%",
		cls: "percent"
	    },
	    {
		str: "won their conference",
		cls: "action"
	    },
	    {
		str: chance_cup+"%",
		cls: "percent"
	    },
	    {
		str: "won the Stanley Cup",
		cls: "action"
	    },
	];
	
	
	var stxbox = d3.select("#statsbox_div").selectAll("p")
	    .data(stats_strings);
	stxbox.enter().append("p");

//	stxbox.enter().append("div").append("p").text("hello");
	
	stxbox.transition().duration(dur)
	    .text(function(d){return d.str;})
	    .attr("class",function(d){return d.cls;});
	
    };
    
    function arcTween(a) {
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
		return arc(i(t));
	};
    }
    
    
    function transition_labels(allScale) {

	var sel_labels = svg.selectAll(".sel_text")
	    .data(results_combined);
	
	sel_labels.enter().append("text")
	
	sel_labels.transition().duration(dur)
	    .attr("class", "sel_text")
	    .text(function(d) {
		return d;
	    })
	    .attr("x", function(d, i) {
		return i * (w / results_all.length) + (w / results_combined.length - selPadding) / 2 + selPadding / 2+padding;
	    })
	    .attr("y", function(d) {
		return allScale(d) - 1;
	    })
	    .attr("font-size", "18px")
	    // .attr("fill", "red")
	    .attr("text-anchor", "middle");
	
	var all_labels = svg.selectAll(".all_text")
	    .data(results_all);
	
	all_labels.enter().append("text")
	
	all_labels.transition().duration(dur)
	    .attr("class", "all_text")
	    .text(function(d) {
		return d;
	    })
	    .attr("x", function(d, i) {
		return i * (w / results_all.length) + (w / results_all.length - allPadding) / 2+padding;
	    })
	    .attr("y", function(d) {
		return allScale(d) - 1;
	    })
	    .attr("font-size", "14px")
	    .attr("fill", "rgb(92,92,92)")
	    .attr("text-anchor", "middle");
	
    }; //transition_labels
    
    function calculate_data() {
	// console.log("~~~~ new calculate_data ~~~~");
	for (i = 0; i < 6; i++) {
	    results_combined[i] = 0;
	    results_all[i] = 0;
	}
	
	var year_range = d3.range(start_year, final_year + 1);
	var total_teams = 0;
	var in_range = 0;
	_.each(year_range, function(year) {
	    if (year != 2005) {
		_.each(data[year], function(team) {
		    if (team.streak >= lowest_sel_streak && team.streak <= highest_sel_streak) {
			results_combined[team.playoffs] += 1;
			in_range += 1;
		    }
		    if (team.streak >= lowest_streak && team.streak <= highest_streak) {
			results_all[team.playoffs] += 1;
			total_teams += 1;
		    }
		    
		});
	    }
	});
	games_in_range = in_range;
	
	var num_playoffs = in_range - results_combined[0];
	var conf_finals = results_combined[5] + results_combined[4] + results_combined[3];
	var num_cupfs = results_combined[5] + results_combined[4];
	var num_cup = results_combined[5];
	
	chance_playoffs =Math.round(100* num_playoffs / in_range);
	chance_cf = Math.round(100*conf_finals / in_range);
	chance_cupfinals = Math.round(100*num_cupfs / in_range);
	chance_cup = Math.round(100*num_cup / in_range);
	
	playoff_percentage = [];
	playoff_percentage.push(results_combined[0]/in_range);
	playoff_percentage.push(results_combined[1]/in_range);
	playoff_percentage.push(results_combined[2]/in_range);
	playoff_percentage.push(results_combined[3]/in_range);
	playoff_percentage.push(results_combined[4]/in_range);
	playoff_percentage.push(results_combined[5]/in_range);
	
	// console.log("Results combined: ", results_combined);
	// console.log("Seasons: " + start_year + "-" + final_year);
	// console.log("Total team*years: " + total_teams);
	// console.log("For a streak length: " + lowest_sel_streak + "-" + highest_sel_streak);
	// console.log("Total team*years in streak range:" + in_range);
	// console.log("Number in playoffs: " + num_playoffs);
	// console.log("Chance of playoffs: " + chance_playoffs);
	// console.log("Chance of conf. finals: " + chance_cf);
	// console.log("Chance cup finals: " + chance_cupfinals);
	// console.log("Chance of Stanley Cup: " + chance_cup);
	// console.log("Playoff percentages: ", playoff_percentage);
	
    }

    function year_string(){
	var str1 = "For the "+games_in_range+" teams ";
	var str2 = ""
	if (start_year === final_year){
	    str2="in "+start_year;
	}
	else {
	    str2="between "+start_year+" & "+final_year;
	}
	return str1+str2;

    }

    function streak_string(){
	var a = lowest_sel_streak;
	var b = highest_sel_streak;
	var str_hdr = "with a season-opening point streak ";
	var str = "";
	if (b===16){
	    if (a===0){
		str = str_hdr+"of any length,";
	    }
	    else if (a===1){
		str = "who won or tied the first game of the season,";
	    }
	    else{
		str = str_hdr+"of at least "+a+" games,";
	    }
	}
	else if (a===0){
	    str = str_hdr+"of "+b+" games or fewer,";
	}
	else{
	    str = str_hdr+"between "+a+" & "+b+" games,";
	}
	return str;
    }
//good-bye... thanks for stopping by... 
});