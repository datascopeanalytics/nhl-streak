import json
import pickle
import os

from django.shortcuts import render_to_response
from django.conf import settings
from django.template import RequestContext

def nhl_visualization(request):    

    filename = os.path.join(settings.PROJECT_ROOT,"data","nhl_streak_42.p")
    with open(filename) as stream:
        data = pickle.load(stream)

    with open("kk", 'w') as stream:
        s = json.dumps(data)
        stream.write(json.dumps(data))

    return render_to_response(
        'main/dummy.html', {
            'data_json': json.dumps(data),
            },
        context_instance=RequestContext(request)
        )

def nhl_corrs(request):

    filename = os.path.join(settings.PROJECT_ROOT,"data","nhl_streak_42.p")

    with open(filename) as stream:
        data = pickle.load(stream)

    return render_to_response(
        'main/nhl_corrs.html', {
            'data_json': json.dumps(data),
            },
        context_instance=RequestContext(request)
        )

def nhl_dc(request):

    filename = os.path.join(settings.PROJECT_ROOT,"data","nhl_streak_pickle.p")

    with open(filename) as stream:
        data = pickle.load(stream)

    return render_to_response(
        'main/test2.html', {
            'data_json': json.dumps(data),
            },
        context_instance=RequestContext(request)
        )
