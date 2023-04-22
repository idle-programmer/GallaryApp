from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .validators import file_size

# Create your models here.
class User(User):
  userID = models.AutoField(primary_key=True)
  # username = models.CharField(max_length=255)
  # email = models.EmailField(max_length=255,unique=True)
  # password = models.CharField(max_length=255)

  def __str__(self):
    return self.username

  def tokens(self):
    refresh = RefreshToken.for_user(self)
    return{
        'refresh':str(refresh),
        'access':str(refresh.access_token)
    }


class Media(models.Model):
  mediaId = models.AutoField(primary_key=True)
  username = models.CharField(max_length=255)
  title=models.CharField(max_length=150)
  File = models.FileField(upload_to="file/%y",validators=[file_size])
  time = models.DateField()
  def __str__(self):
    return self.title
  class Meta:
    ordering=('-mediaId',)   