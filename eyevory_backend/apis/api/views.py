import profile
from webbrowser import get
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
        data['isadmin'] = profile.isadmin
        return Response(data)
###################################################################



# Get all nodes
@api_view(['GET', ])
def list_nodes(request):
    if request.method == "GET":
        profile = get_object_or_404(Profile, username=request.user)
        return Response(Node.objects.exclude(profile.granted_nodes.all()))
###################################################################



# Request a node
@api_view(['GET', ])
def request_node(request):
    if request.method == "GET":
        node = get_object_or_404(Node, ip=request.data['ip'])
        profile = get_object_or_404(Profile, username=request.user)
        profile.requested_nodes.add(node)
###################################################################



# Get all granted nodes
@api_view(['GET', ])
def granted_nodes(request):
    if request.method == "GET":
        profile = get_object_or_404(Profile, username=request.user)
        return Response(profile.granted_nodes.all())
###################################################################


# Get all users
@api_view(['GET', ])
def list_users(request):
    if request.method == "GET":
        return Response(Profile.objects.filter(isadmin=0))
###################################################################


# Get requests of a user
@api_view(['GET', ])
def get_user_requets(request):
    if request.method == "GET":
        return Response(
            get_object_or_404(Profile,
                username = get_object_or_404(User,
                    username = request.data['username']
                    )
            ).requested_nodes.all()
        )
###################################################################


# Approve/Disprove Request of a user
@api_view(['POST', ])
def approve(request):
    if request.method == "GET":
        profile = get_object_or_404(Profile, 
            username = get_object_or_404( User,
                username = request.data['username'] 
                ) 
            )
        node = get_object_or_404(Node, ip=request.data['ip'])
        profile.requested_nodes.remove(node)
        if request.data['approve']:
            profile.granted_nodes.add(node)
###################################################################
