from .models import Media
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics,status,views,permissions,viewsets
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializer import LogoutSerializer, MediaSerializer, RegisterSerializer, LoginSerializer
from rest_framework.parsers import FileUploadParser,MultiPartParser, FormParser
from rest_framework.views import APIView
from .forms import File_form
# Create your views here.
class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self,request):
        user=request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        return Response(user_data, status=status.HTTP_201_CREATED)
    

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    # permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
        # return JsonResponse('done',safe=False)

class MediaUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        serializer = MediaSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

    def get(self, request, format=None):
        media = Media.objects.all()
        serializer = MediaSerializer(media, many=True)
        return Response(serializer.data)   
    

@csrf_exempt
def deleteFile(self,request, format=None):
    media = Media.objects.filter(mediaId=request)
    if media:
        media.delete()
        return JsonResponse({"msg":"File Deleted"},safe=False)
    else:
        return JsonResponse({"msg":'File not found'},safe=False)