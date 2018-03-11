from django.conf.urls import url
from app1.view import UserView
from django.views.generic import RedirectView
from app1.view import TransferFile
from app1.view import ProductView
urlpatterns = [
    url(r'^user/$',UserView.User_list),
    url(r'^product/$',ProductView.ProductList),
    url(r'^upload/$',TransferFile.uploadFiles),
    url(r'^favicon\.ico$', RedirectView.as_view(url='/static/images/favicon.ico')),
    #url(r'^user/(?P<pk>[0-9]+)/$',views.User_detial),
]