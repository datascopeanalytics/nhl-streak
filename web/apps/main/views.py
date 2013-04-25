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

    return render_to_response(
        'main/dummy.html', {
            'data_json': json.dumps(data),
            },
        context_instance=RequestContext(request)
        )

def nhl_corrs(request):

    filename = os.path.join(settings.PROJECT_ROOT,"data","streak_histogram_data.pkl")

    with open(filename) as stream:
        data = pickle.load(stream)

    return render_to_response(
        'main/nhl_corrs.html', {
            'hist_data': json.dumps(data),
            },
        context_instance=RequestContext(request)
        )

def nhl_transcorr(request):

    filename = os.path.join(settings.PROJECT_ROOT,"data","nhl_streak_42.p")

    with open(filename) as stream:
        data = pickle.load(stream)

    return render_to_response(
        'main/transcorr.html', {
            'data_json': json.dumps(data),
            },
        context_instance=RequestContext(request)
        )
