from django.urls import include,path,re_path
from . import views
from rest_framework_simplejwt.views import (TokenRefreshView,)



urlpatterns = [
    path('register/',views.RegisterView.as_view(),name="register"),
    path('login/',views.LoginAPIView.as_view(),name="login"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]