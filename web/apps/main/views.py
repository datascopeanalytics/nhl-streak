import json
import pickle
import os

from django.shortcuts import render_to_response
from django.conf import settings
from django.template import RequestContext

def nhl_visualization(request):    

    filename = os.path.join(settings.PROJECT_ROOT,"data","nhl_streak_pickle.p")
    with open(filename) as stream:
        data = pickle.load(stream)

    return render_to_response(
        'main/dummy.html', {
            'data_json': json.dumps(data),
            },
        context_instance=RequestContext(request)
        )
