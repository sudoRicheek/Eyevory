from django import http
from rest_framework import status, generics, serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
# from django.utils import timezone

from apis.models import Profile, Node
from apis.api.serializers import NodeSerializer, ProfileSerializer, RegistrationSerializer

import os
from pytz import timezone


# Registration view for signup
@api_view(['POST', ])
@permission_classes([])
@authentication_classes([])
def RegisterView(request):  # For signup
    if request.method == 'POST':
        serializer = RegistrationSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.create(request.data)
            refresh = RefreshToken.for_user(user)
            #profile = get_object_or_404(Profile, user=user)

            data['response'] = "Successfully Signed Up"
            data['username'] = user.username
            # data['userId'] = user.id
            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)
            return Response(data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
###################################################################


# Extending TokenObtainPairSerializer to get userid and userName !
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra responses here
        data['username'] = self.user.username
        #data['name'] = self.user.name
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
###################################################################


# Get Profile Details view
@api_view(['GET', ])
def get_profile(request):
    if request.method == "GET":
        profile = get_object_or_404(Profile, username=request.user)
        pr_serializer = ProfileSerializer(profile)
        data = pr_serializer.data
        data['username'] = profile.username
        return Response(data)
###################################################################



# Get all nodes
@api_view(['GET', ])
def list_nodes(request):
    if request.method == "GET":
        return Response(Node.objects.all())
###################################################################



# Add a node
@api_view(['POST', ])
def add_node(request):
    if request.method == "POST":
        serializer = NodeSerializer(data = request.data)
        serializer.add()
        return Response(status=status.HTTP_201_CREATED)
###################################################################


# Delete a node
@api_view(['DELETE, '])
def delete_node(request):
    if request.method == "DELETE":
        serializer = NodeSerializer(data = request.data)
        serializer.remove()
        return Response(status=status.HTTP_200_OK)
###################################################################


