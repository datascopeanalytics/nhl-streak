from django.conf.urls.defaults import *

import views

urlpatterns = patterns(
    '',

    url(r'^$', views.nhl_visualization, name="nhl_visualization"),
    url(r'corrs$', views.nhl_corrs, name="nhl_corrs"),
)



