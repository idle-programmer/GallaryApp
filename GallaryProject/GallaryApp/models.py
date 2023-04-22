from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

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

# class Login(models.Model):
#   Email = models.CharField(max_length=255)
#   Password = models.CharField(max_length=255)


# class Media(models.Model):
#   MediaID = models.AutoField(primary_key=True)
#   UserID = models.IntegerField()
#   UserName = models.CharField(max_length=255)
#   File = models.FileField(max_length=255)
#   Time = models.DateField()