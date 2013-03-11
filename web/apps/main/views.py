import json
import pickle
import os

from django.shortcuts import render_to_response
from django.conf import settings
from django.template import RequestContext

def nhl_visualization(request):    

    # filename = os.path.join(settings.PROJECT_ROOT,"data","nhl_streak_pickle.p")
    filename = os.path.join(settings.PROJECT_ROOT,"data","nhl_streak_pickle_max.p")
    with open(filename) as stream:
        data = pickle.load(stream)
    return render_to_response(
        'main/dummy.html', {
            'data_json': json.dumps(data),
            },
        context_instance=RequestContext(request)
        )

def nhl_visualization_dc(request):    

    # filename = os.path.join(settings.PROJECT_ROOT,"data","nhl_streak_pickle.p")
    filename = os.path.join(settings.PROJECT_ROOT,"data","nhl_streak_pickle_max.p")
    with open(filename) as stream:
        data = pickle.load(stream)

    flattened_data = []
    for year, teams in data.iteritems():
        for team, stats in teams.iteritems():  
            new_object = {"year": year,
                          "team": team}
            for key, item in stats.iteritems():
                new_object[key] = item
            flattened_data.append(new_object)

    return render_to_response(
        'main/nhl_dc.html', {
            'data_json': json.dumps(flattened_data),
            },
        context_instance=RequestContext(request)
        )

