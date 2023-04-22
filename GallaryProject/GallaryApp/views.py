from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics,status,views,permissions
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializer import MediaSerializer, RegisterSerializer, LoginSerializer
from rest_framework.parsers import FileUploadParser,MultiPartParser, FormParser
from rest_framework.views import APIView
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

@csrf_exempt
def media(request):
    if request.method == 'POST':
        parser_classes = (MultiPartParser, FormParser,)
        # file = request.FILES
        print(request.FILES['File'])
        # print(file)
        return HttpResponse(request.FILES['File'])
        # file_serializer = MediaSerializer(data=request.data)

    #   if file_serializer.is_valid():
    #       file_serializer.save()
    #       return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    #   else:
    #       return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
