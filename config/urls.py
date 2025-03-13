# myproject/urls.py
from django.contrib import admin
from django.urls import path, include
from myapp.views import home, menu
from django.conf import settings
from django.conf.urls.static import static
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('menu/', menu, name='menu'),
    path('common/', include('common.urls')),
    path('', views.home, name='home'),  # '/' 에 해당되는 path
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
