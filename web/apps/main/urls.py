from django.conf.urls.defaults import *

import views

urlpatterns = patterns(
    '',

    url(r'^$', views.nhl_visualization, name="nhl_visualization"),
    url(r'test2$', views.nhl_test2, name="nhl_test2"),
    url(r'dc$',views.nhl_dc, name="nhl_dc"),
)



