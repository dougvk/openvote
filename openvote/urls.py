from django.conf.urls import patterns, include, url
from django.conf.urls.defaults import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from tastypie.api import Api

from openvote.api import VoterResource
from elections.api import VoteResource, \
                            InterestEstimateResource

v1_api = Api(api_name='v1')
v1_api.register(VoterResource())
#v1_api.register(RoleResource())
v1_api.register(VoteResource())
#v1_api.register(ElectionResource())
#v1_api.register(CandidateResource())
v1_api.register(InterestEstimateResource())

urlpatterns = patterns('',
    url(r'^$', 'openvote.views.home', name='home'),
    url(r'^maptest$', 'openvote.views.maptest', name='maptest'),
    url(r'^logout$', 'openvote.views.logout', name='logout'),
    url(r'^api/', include(v1_api.urls)),

    url(r'^about$', 'openvote.views.about', name='about'),
    url(r'^help$', 'openvote.views.help', name='help'),
    url(r'^terms$', 'openvote.views.terms', name='terms'),
    url(r'^privacy$', 'openvote.views.privacy', name='privacy'),
    url(r'^code$', 'openvote.views.code', name='code'),
    url(r'^humans.txt$', 'openvote.views.humans', name='humans'),
    
    # Include our OAuth urls
    url(r'', include('social_auth.urls')),

    # url(r'^admin/', include(admin.site.urls)),
)

# Allow serving static files locally, for now.
# TODO: Put static files on CDN/S3
urlpatterns += staticfiles_urlpatterns()
