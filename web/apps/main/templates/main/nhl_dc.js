$(function() {
	// this is a django template. we can use the django variables to
	// extract data. weeeeee!
	var data = {{data_json}};
	var nhl_streak = crossfilter(data);
	var all = nhl_streak.groupAll();
	var static_percentages = crossfilter(data);
	var all_static = static_percentages.groupAll();

	var pie_dim = 300;
	var outer_radius = pie_dim/2;
	var inner_radius = outer_radius * .75; 
	console.log(data);
	console.log(nhl_streak);
	// var percentage = d3.format("%");

	// //set static values for background histogram
	// var lowest_streak = 0;
	// var highest_streak = 16;

	// // These numbers must change when we manipulate the slider bar
	// var start_year = 1960;
	// var final_year = 2012;
	// var lowest_sel_streak = 0;
	// var highest_sel_streak = 16;

	// // Arrays to hold & access data of interest
	// var results_combined = [];
	// var results_all = [];
	// var playoff_percentage = [];

	// // Remember the law of 2005
	// calculate_data();
	var getYear = nhl_streak.dimension(function(d) {
		return parseInt(d.year)
	});
	var getYearTotal = getYear.group()
	    .reduce(function reduceAdd(p, v) {
	    	return p + 1;
	    },

	    function reduceRemove(p, v) {
	    	return p - 1;
	    },

	    function reduceInitial() {
	    	return 0;
	    });

	var getStreak = nhl_streak.dimension(function(d) {
		return d.streak
	});
	var getStreakTotal = getStreak.group()
	    .reduce(function reduceAdd(p, v) {
	    	return p + 1;
	    },

	    function reduceRemove(p, v) {
	    	return p - 1;
	    },

	    function reduceInitial() {
	    	return 0;
	    });
	/* Create a bar chart and use the given css selector as anchor. You can also specify
	 * an optional chart group for this chart to be scoped within. When a chart belongs
	 * to a specific group then any interaction with such chart will only trigger redraw
	 * on other charts within the same chart group. */
	var season_bar_chart = dc.barChart("#season_slider")
		.width(480) // (optional) define chart width, :default = 200
	    .height(100) // (optional) define chart height, :default = 200
	    .transitionDuration(500) // (optional) define chart transition duration, :default = 500
	    .margins({
	    	top: 10,
	    	right: 30,
	    	bottom: 30,
	    	left: 30
	    })
		.dimension(getYear) // set dimension
	    .group(getYearTotal) // set group
	    .elasticY(true)
	    // .yAxisPadding(100)
	    // .xAxisPadding(500)
	    .x(d3.scale.linear()
	       .domain(d3.extent(data, function(d) {
	       	return parseInt(d.year);
	       })))
	    .y(d3.scale.linear().domain([0, 30]))
	    .on("filtered",function(chart,filter){
	    	getYear_static.filter(filter);
	    	if (filter !== null){
	    		var html = String(Math.floor(filter[0])) + " to " + String(Math.floor(filter[1]));
	    	}
	    	else{
	    		var html = "1960 to 2012";
	    	}
	    	$("#percent_year").html(html);
	    	update_metrics();
	    })
	    .xUnits(dc.units.integers)
	    .brushOn(true)
	    .title(function(d) {
	    	return "Value: " + d.streak;
	    })
	    // (optional) whether chart should render titles, :default = false
	    .renderTitle(true);
	    season_bar_chart.xAxis()
    	.tickFormat(function(v) {
    		return v;
    	});

    var streak_bar_chart = dc.barChart("#streak_slider")
		.width(460) // (optional) define chart width, :default = 200
	    .height(100) // (optional) define chart height, :default = 200
	    .transitionDuration(500) // (optional) define chart transition duration, :default = 500
	    .margins({
	    	top: 10,
	    	right: 10,
	    	bottom: 30,
	    	left: 30
	    })
		.dimension(getStreak) // set dimension
	    .group(getStreakTotal) // set group
	    // .yAxisPadding(100)
	    // .xAxisPadding(500)
	    .x(d3.scale.linear()
	       .domain(d3.extent(data, function(d) {
	       	return d.streak;
	       })))
	    .y(d3.scale.linear().domain([0, 400]))
	    .elasticY(true)
	    .xUnits(dc.units.integers)
	    .brushOn(true)
	    .on("filtered",function(chart,filter){
	    	if (filter !== null){
	    		var html = String(Math.floor(filter[0])) + " to " + String(Math.floor(filter[1]));
	    	}
	    	else{
	    		var html = "0 to 16";
	    	}
	    	$("#static_streak").html(html);
	    	$("#percent_streak").html(html);
	    	update_metrics();
	    })
	    .title(function(d) {
	    	return "Value: " + d.streak;
	    })
	    // (optional) whether chart should render titles, :default = false
	    .renderTitle(true)
	    .xAxis()
	    .tickFormat(function(v) {
	    	return v;
	    });

    var playoff_map ={
    	"No playoffs":"#FEE5D9",
    	"Round 1":"#FCBBA1",
    	"Round 2":"#FC9272",
    	"Semi-finals":"#FB6A4A",
    	"Finals":"#DE2D26",
    	"Champions":"#c8102e"
    };

    var playoff_list = [
    	{type:"No playoffs",
    	 value:"#FEE5D9"},
    	{type:"Round 1",
    	 value:"#FCBBA1"},
    	{type:"Round 2",
    	 value:"#FC9272"},
    	{type:"Semi-finals",
    	 value:"#FB6A4A"},
    	{type:"Finals",
    	 value:"#DE2D26"},
    	{type:"Champions",
    	 value:"#c8102e"}
    ];

    var rect_dim = 20;
    var padding = 8;
    var svg = d3.select("#legend")
    .append("svg")
    .attr("width",280)
    .attr("height",180);

    var rects = svg.selectAll(".legend")
    .data(playoff_list)
    .enter().append("rect")
    .attr("x",0)
    .attr("y", function (d, i){return (rect_dim + padding)*i})
    .attr("width", rect_dim)
    .attr("height", rect_dim)
    .style("fill", function(d){return d.value});

    var labels = svg.selectAll(".labels")
    .data(playoff_list)
    .enter().append("text")
    .attr("x",rect_dim + padding*2)
    .attr("y", function (d, i){return (rect_dim + padding)*i + rect_dim - padding/2})
    .text(function(d){return d.type});


	var getPlayoff = nhl_streak.dimension(function (d) {
		var playoff = d.playoffs;
		switch (playoff){
			case 0:
			    return "No playoffs";
			    break;
			case 1:
			    return "Round 1";
			    break;
			case 2:
			    return "Round 2";
			    break;
			case 3:
			    return "Semi-finals";
			    break;
			case 4:
			    return "Finals";
			    break;
			case 5:
			    return "Champions";
			    break;
		}
	});

	var playoffGroup = getPlayoff.group();

	var playoff_percentage = dc.pieChart("#playoff_percentage")
		.width(pie_dim) // (optional) define chart width, :default = 200
	    .height(pie_dim) // (optional) define chart height, :default = 200
	    .transitionDuration(500) // (optional) define chart transition duration, :default = 500
		.dimension(getPlayoff) // set dimension
	    .group(playoffGroup) // set group
	    .radius(outer_radius)
	    .innerRadius(inner_radius)
	    // .on("postRender", function(chart){
	    // })
	    .label(function(d){
	    	if (d.data.value !== all.value() && playoff_percentage.hasFilter()){
	    		return "";
	    	}
	    	else{
	    		return Math.floor(d.data.value/all.value() * 100) +"%";
	    	}
	    });

	playoff_percentage.minAngleForLabel(.1);
	playoff_percentage.renderlet(function (chart){
		chart.selectAll("path")
		  .attr("fill",function(d){
		  	if (d !== undefined){
		  		return playoff_map[d.data.key];
		  	}
		  });	
	});		


	var getPlayoff_static = static_percentages.dimension(function (d) {
		var playoff = d.playoffs;
		switch (playoff){
			case 0:
			    return "No playoffs";
			    break;
			case 1:
			    return "Round 1";
			    break;
			case 2:
			    return "Round 2";
			    break;
			case 3:
			    return "Semi-finals";
			    break;
			case 4:
			    return "Finals";
			    break;
			case 5:
			    return "Champions";
			    break;
		}
	});

	var playoffGroup_static = getPlayoff_static.group();

	var getYear_static = static_percentages.dimension(function(d) {
		return parseInt(d.year)
	});

	var playoff_percentage_static = dc.pieChart("#static_percentage")
		.width(pie_dim) // (optional) define chart width, :default = 200
	    .height(pie_dim) // (optional) define chart height, :default = 200
	    .transitionDuration(500) // (optional) define chart transition duration, :default = 500
		.dimension(getPlayoff_static) // set dimension
	    .group(playoffGroup_static) // set group
	    .radius(outer_radius)
	    .innerRadius(inner_radius)
	    // .on("postRender", function(chart){
	    // })
     	.label(function(d){
     	// 	var temp_selected = "";
	    	// playoff_percentage_static.selectAll(".pie-slice")
	    	//     .each(function (d){
	    	//     	if (this.classList.length === 3){ 
	    	//     		temp_selected = this.classList[1];
	    	//     		playoff_percentage_static.selectAll("text")
	    	//     		.text(function (d){
	    	//     			console.log(this, this.classList[1], temp_selected)
	    	//     			if (this.classList[1] === temp_selected){
	    	//     				console.log("found you fucker")
	    	//     			}
	    	//     		})

	    	//     	}
	    	//     });

	    	if (d.data.value !== all_static.value() && playoff_percentage_static.hasFilter()){
	    		return "";
	    	}
	    	else{
	    		return Math.floor(d.data.value/all_static.value() * 100) +"%";
	    	}
	    });

	playoff_percentage_static.minAngleForLabel(.1);
	playoff_percentage_static.renderlet(function (chart){
		chart.selectAll("path")
		  .attr("fill",function(d){
		  	if (d !== undefined){
		  		return playoff_map[d.data.key];
		  	}
		  });	
	});
	update_metrics();
	function update_metrics(){
		$("#team_number").html(all.value());
		var playoff_chance = _.reduce(playoffGroup.all(),function (memo, item){
			if (item.key === "No playoffs"){
				return all.value() - item.value + memo;
			}
			return memo;
		},0);
		$("#playoff_chance").html(playoff_chance);

		var made_finals = _.reduce(playoffGroup.all(),function (memo, item){
			if (item.key === "Finals" || item.key === "Champions"){
				return item.value + memo;
			}
			return memo;
		},0);
		$("#final_chance").html(made_finals);
		var champions = _.reduce(playoffGroup.all(),function (memo, item){
			if (item.key === "Champions"){
				return item.value + memo;
			}
			return memo;
		},0);
		$("#stanley_chance").html(champions);
	}
	dc.renderAll();
	});
	
	//width and height
// 	var w = 500;
// 	var h = 350;
// 	var r = 90;

// 	// padded like bike shorts
// 	var padding = 10;
// 	var topPadding = 50;
// 	var allPadding = 70;
// 	var selPadding = 50;

// 	var dur = 300; //transition duration

// 	//blackhawks colors
// 	var color = d3.scale.ordinal()
// 		.range(["gray", "black", "orange", "yellow", "green", "red"]);

// 	// vars for statsboxx2000
// 	var chance_playoffs = 0;
// 	var chance_cf = 0;
// 	var chance_cupfinals = 0;
// 	var chance_cup = 0;
// 	var stats_strings = [];

// 	//create svg elements
// 	var svg = d3.select("#svg_placer")
// 		.append("svg")
// 		.attr("width", 2 * w)
// 		.attr("height", h);

// 	var slider_svg = d3.select("#sliders")
// 		.append("svg")
// 		.attr("id", "slider_svg")
// 		.attr("width", w)
// 		.attr("height", h / 2);

// 	var streak_scale = d3.scale.linear()
// 		.domain([lowest_streak, highest_streak])
// 		.range([$('#streak_holder').width() - $('#streak_slider').width(),
// 	$('#streak_holder').width()]);
// 	var y_streak_scale = $("#streak_holder").css("margin-top");

// 	y_streak_scale = parseInt(y_streak_scale) * .7;
// 	console.log("y_streak_scale: ", y_streak_scale);

// 	var streak_points = [{
// 		val: 0,
// 		label: "0"
// 	}, {
// 		val: 2,
// 		label: "•"
// 	}, {
// 		val: 4,
// 		label: "4"
// 	}, {
// 		val: 6,
// 		label: "•"
// 	}, {
// 		val: 8,
// 		label: "8"
// 	}, {
// 		val: 10,
// 		label: "•"
// 	}, {
// 		val: 12,
// 		label: "12"
// 	}, {
// 		val: 14,
// 		label: "•"
// 	}, {
// 		val: 16,
// 		label: "16"
// 	}, ];

// 	var streak_axis = slider_svg.selectAll('.streak_text')
// 		.data(streak_points)
// 		.enter().append('text')
// 		.text(function(d) {
// 		return d.label;
// 	})
// 		.attr('x', function(d) {
// 		return streak_scale(d.val)
// 	})
// 		.attr('y', y_streak_scale)
// 		.attr('text-anchor', 'middle')
// 		.attr('font-size', '12px');


// 	var year_scale = d3.scale.linear()
// 		.domain([start_year, final_year])
// 		.range([$('#season_holder').width() - $('#season_slider').width(),
// 	$('#season_holder').width()]);

// 	var y_year_scale = parseInt($("#streak_holder").height()) + parseInt($("#season_holder").css("margin-top")) * 1.7;

// 	console.log("y_year_scale: ", y_year_scale);

// 	var year_points = [{
// 		val: 1960,
// 		label: "'60"
// 	}, {
// 		val: 1965,
// 		label: "•"
// 	}, {
// 		val: 1970,
// 		label: "'70"
// 	}, {
// 		val: 1975,
// 		label: "•"
// 	}, {
// 		val: 1980,
// 		label: "'80"
// 	}, {
// 		val: 1985,
// 		label: "•"
// 	}, {
// 		val: 1990,
// 		label: "'90"
// 	}, {
// 		val: 1995,
// 		label: "•"
// 	}, {
// 		val: 2000,
// 		label: "'00"
// 	}, {
// 		val: 2005,
// 		label: "•"
// 	}, {
// 		val: 2010,
// 		label: "'10"
// 	}, ];

// 	var year_axis = slider_svg.selectAll('.year_text')
// 		.data(year_points).enter().append('text')
// 		.text(function(d) {
// 		return d.label
// 	})
// 		.attr('x', function(d) {
// 		return year_scale(d.val)
// 	})
// 		.attr('y', y_year_scale)
// 		.attr('text-anchor', 'middle')
// 		.attr('font-size', '12px');

// 	var statsbox_svg = d3.select("#stats_box")
// 		.append("svg")
// 		.attr("id", "statsbox_svg")
// 		.attr("width", w / 1.2)
// 		.attr("height", h / 2);

// 	//initiate some pie things
// 	var arc = d3.svg.arc()
// 		.outerRadius(r)
// 		.innerRadius(r * .65);

// 	var text_arc = d3.svg.arc()
// 		.outerRadius(r + 40)
// 		.innerRadius(r);

// 	var pie = d3.layout.pie()
// 		.value(function(d) {
// 		return d;
// 	})
// 		.sort(function(a, b) {
// 		return 1;
// 	});

// 	var donut_g = svg.append("g")
// 		.attr("class", "donut")
// 		.attr("transform", "translate(" + (w + r * 1.2 + 40) + "," + (r * 1.2 + 40) + ")");

// 	var donut = donut_g.selectAll("g.arc")
// 		.data(pie(results_combined))
// 		.enter().append('g')
// 		.attr("class", arc);

// 	donut.append("path")
// 		.attr("class", "arc_path")
// 		.style("fill", function(d, i) {
// 		return color(i)
// 	})
// 		.attr("d", arc)
// 		.each(function(d) {
// 		this._current = d
// 	});

// 	donut.append("text")
// 		.attr("text-anchor", "middle")
// 		.attr("class", "arc_text")
// 		.each(function(d) {
// 		//console.log("inside text: ", text_arc.centroid(d));
// 		this._current = text_arc.centroid(d);
// 	});

// 	//call "transition" to update & draw charts
// 	transition();

// 	//initiate slider jquery objects
// 	$("#streak_slider").slider({
// 		range: true,
// 		min: 0,
// 		max: 16,
// 		step: 1,
// 		values: [lowest_sel_streak, highest_sel_streak],
// 		slide: function(event, ui) {
// 			lowest_sel_streak = ui.values[0];
// 			highest_sel_streak = ui.values[1];
// 			transition();
// 		} //listens for slider event & updates data arrays
// 	});

// 	$("#season_slider").slider({
// 		range: true,
// 		min: 1960,
// 		max: 2012,
// 		step: 1,
// 		values: [start_year, final_year],
// 		slide: function(event, ui) {
// 			start_year = ui.values[0];
// 			final_year = ui.values[1];
// 			transition();
// 		} //listens for slider event & updates data arrays
// 	});


// 	function transition() {

// 		//recalculate the data based on the slider inputs
// 		calculate_data();

// 		var allScale = d3.scale.linear()
// 			.domain([0, d3.max(results_all)])
// 			.range([h - padding, topPadding]);

// 		//all_bars display the #of team*seasons to finish at that level
// 		//of playoff, regardless of opening streak (baseline)
// 		var all_bars = svg.selectAll(".all_rect")
// 			.data(results_all);

// 		all_bars.enter().append("rect");

// 		all_bars.transition().duration(dur)
// 			.attr("class", "all_rect")
// 			.attr("x", function(d, i) {
// 			return i * (w / results_all.length);
// 		})
// 			.attr("y", function(d) {
// 			return allScale(d);
// 		})
// 			.attr("width", w / results_all.length - allPadding)
// 			.attr("height", function(d) {
// 			return h - allScale(d) - padding;
// 		})
// 			.style("fill", "rgb(92,92,92)");

// 		var sel_bars = svg.selectAll(".sel_rect")
// 			.data(results_combined);

// 		sel_bars.enter().append("rect");

// 		//set attributes of sel_bars
// 		sel_bars.transition().duration(dur)
// 			.attr("class", "sel_rect")
// 			.attr("x", function(d, i) {
// 			return i * (w / results_combined.length) + selPadding / 2;
// 		})
// 			.attr("y", function(d) {
// 			return allScale(d);
// 		})
// 			.attr("width", w / results_combined.length - selPadding)
// 			.attr("height", function(d) {
// 			return h - allScale(d) - padding;
// 		})
// 		//.style("fill","orange");
// 		.style("fill", function(d, i) {
// 			return color(i)
// 		});

// 		transition_labels(allScale);


// 		//transition the donut!
// 		var arcs = donut_g.selectAll(".arc_path")
// 			.data(pie(results_combined));

// 		arcs.transition().duration(dur)
// 			.attrTween("d", arcTween);

// 		var arc_text = donut_g.selectAll(".arc_text")
// 			.data(pie(results_combined));

// 		arc_text.transition().duration(dur)
// 			.attr("transform", function(d, i) {
// 			console.log("Eating donuts: ", d);
// 			return "translate(" + text_arc.centroid(d) + ")";
// 		})
// 			.text(function(d, i) {
// 			return percentage(playoff_percentage[i])
// 		});



// 		//statsboxxx 
// 		// string the data
// 		stats_strings = [{
// 			str: "between " + start_year + " & " + final_year + ",",
// 			size: 14,
// 			x: 10,
// 			y: 20
// 		}, {
// 			str: "for an opening season no-lose streak between " + lowest_sel_streak + " & " + highest_sel_streak,
// 			size: 16,
// 			x: 10,
// 			y: 45
// 		}, {
// 			str: chance_playoffs + "%",
// 			size: 32,
// 			x: 10,
// 			y: 80
// 		}, {
// 			str: "chance of making the playoffs",
// 			size: 20,
// 			x: 80,
// 			y: 80
// 		}, {
// 			str: chance_cupfinals + "%",
// 			size: 32,
// 			x: 10,
// 			y: 115
// 		}, {
// 			str: "chance of playing for the cup",
// 			size: 20,
// 			x: 80,
// 			y: 115
// 		}, {
// 			str: chance_cup + "%",
// 			size: 32,
// 			x: 10,
// 			y: 150
// 		}, {
// 			str: "chance of winning the Stanley Cup",
// 			size: 20,
// 			x: 80,
// 			y: 150
// 		}, ];


// 		var stxbox = d3.select("#statsbox_svg").selectAll("text")
// 			.data(stats_strings);
// 		stxbox.enter().append("text");

// 		stxbox.transition().duration(dur)
// 			.text(function(d) {
// 			return d.str;
// 		})
// 			.attr("font-size", function(d) {
// 			//console.log(d.size);
// 			return d.size + "px";
// 		})
// 			.attr("x", function(d) {
// 			return d.x;
// 		})
// 			.attr("y", function(d) {
// 			return d.y;
// 		});

// 	};

// 	function arcTween(a) {
// 		var i = d3.interpolate(this._current, a);
// 		this._current = i(0);
// 		return function(t) {
// 			return arc(i(t));
// 		};
// 	}


// 	function transition_labels(allScale) {

// 		var sel_labels = svg.selectAll(".sel_text")
// 			.data(results_combined);

// 		sel_labels.enter().append("text")

// 		sel_labels.transition().duration(dur)
// 			.attr("class", "sel_text")
// 			.text(function(d) {
// 			return d;
// 		})
// 			.attr("x", function(d, i) {
// 			return i * (w / results_all.length) + (w / results_combined.length - selPadding) / 2 + selPadding / 2;
// 		})
// 			.attr("y", function(d) {
// 			return allScale(d) - 1;
// 		})
// 			.attr("font-family", "sans-serif")
// 			.attr("font-size", "18px")
// 			.attr("fill", "red")
// 			.attr("text-anchor", "middle");

// 		var all_labels = svg.selectAll(".all_text")
// 			.data(results_all);

// 		all_labels.enter().append("text")

// 		all_labels.transition().duration(dur)
// 			.attr("class", "all_text")
// 			.text(function(d) {
// 			return d;
// 		})
// 			.attr("x", function(d, i) {
// 			return i * (w / results_all.length) + (w / results_all.length - allPadding) / 2;
// 		})
// 			.attr("y", function(d) {
// 			return allScale(d) - 1;
// 		})
// 			.attr("font-family", "sans-serif")
// 			.attr("font-size", "12px")
// 			.attr("fill", "rgb(92,92,92)")
// 			.attr("text-anchor", "middle");

// 	}; //transition_labels



// 	function calculate_data() {
// 		console.log("~~~~ new calculate_data ~~~~");
// 		for (i = 0; i < 6; i++) {
// 			results_combined[i] = 0;
// 			results_all[i] = 0;
// 		}

// 		var year_range = d3.range(start_year, final_year + 1);
// 		var total_teams = 0;
// 		var in_range = 0;
// 		_.each(year_range, function(year) {
// 			if (year != 2005) {
// 				_.each(data[year], function(team) {
// 					if (team.streak >= lowest_sel_streak && team.streak <= highest_sel_streak) {
// 						results_combined[team.playoffs] += 1;
// 						in_range += 1;
// 					}
// 					if (team.streak >= lowest_streak && team.streak <= highest_streak) {
// 						results_all[team.playoffs] += 1;
// 						total_teams += 1;
// 					}

// 				});
// 			}

// 		});

// 		var num_playoffs = in_range - results_combined[0];
// 		var conf_finals = results_combined[5] + results_combined[4] + results_combined[3];
// 		var num_cupfs = results_combined[5] + results_combined[4];
// 		var num_cup = results_combined[5];

// 		chance_playoffs = Math.round(100 * num_playoffs / in_range);
// 		chance_cf = Math.round(100 * conf_finals / in_range);
// 		chance_cupfinals = Math.round(100 * num_cupfs / in_range);
// 		chance_cup = Math.round(100 * num_cup / in_range);

// 		playoff_percentage = [];
// 		playoff_percentage.push(results_combined[0] / in_range);
// 		playoff_percentage.push(results_combined[1] / in_range);
// 		playoff_percentage.push(results_combined[2] / in_range);
// 		playoff_percentage.push(results_combined[3] / in_range);
// 		playoff_percentage.push(results_combined[4] / in_range);
// 		playoff_percentage.push(results_combined[5] / in_range);

// 		console.log("Results combined: ", results_combined);
// 		console.log("Seasons: " + start_year + "-" + final_year);
// 		console.log("Total team*years: " + total_teams);
// 		console.log("For a streak length: " + lowest_sel_streak + "-" + highest_sel_streak);
// 		console.log("Total team*years in streak range:" + in_range);
// 		console.log("Number in playoffs: " + num_playoffs);
// 		console.log("Chance of playoffs: " + chance_playoffs);
// 		console.log("Chance of conf. finals: " + chance_cf);
// 		console.log("Chance cup finals: " + chance_cupfinals);
// 		console.log("Chance of Stanley Cup: " + chance_cup);
// 		console.log("Playoff percentages: ", playoff_percentage);

// 	}
// 	//good-bye... thanks for stopping by... 
// });