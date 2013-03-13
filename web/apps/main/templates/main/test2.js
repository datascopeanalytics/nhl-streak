$(function(){
    // this is a django template. we can use the django variables to
    // extract data. weeeeee!
    var data = {{data_json}};

    function calculate_data() {
	console.log("~~~~ new calculate_data ~~~~");
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
	
});