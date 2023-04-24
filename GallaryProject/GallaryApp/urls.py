from django.urls import include,path,re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)



urlpatterns = [
    path('register/',views.RegisterView.as_view(),name="register"),
    path('login/',views.LoginAPIView.as_view(),name="login"),
    path('logout/', views.LogoutAPIView.as_view(), name="logout"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('media/', views.MediaUploadView.as_view(), name='media-upload'),
    path('del/media/',views.deleteFile,name='media-delete'),
    re_path('del/media/$',views.deleteFile,name='media-delete'),
    re_path('del/media/([0-9]+$)',views.deleteFile,name='media-delete')
]

# if settings.DEBUG:
#     urlpatterns +=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)