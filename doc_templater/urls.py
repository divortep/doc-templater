from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^documents$', views.all_documents, name='all_documents'),
    url(r'^document/(?P<id>\d+)$', views.document, name='document'),
    url(r'^document/upload$', views.upload_document, name='upload_document'),
    url(r'^document/(?P<id>\d+)/download$', views.download_document, name='download_document'),
]
