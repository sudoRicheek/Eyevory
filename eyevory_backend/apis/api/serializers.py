from pkg_resources import require
from rest_framework import serializers
from apis.models import Profile
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        #fields = ['username', 'email', 'name' ]
        fields = ['username', 'email', 'name', 'role']


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
        )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    name = serializers.CharField(required=True)
    role = serializers.IntegerField(required=True)

    class Meta:
        model = Profile
        fields = ('username', 'password', 'password2', 'email', 'name', 'role')
        extra_kwargs = {
            'name': {'required': True},
            'role': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )        
        user.set_password(validated_data['password'])
        user.save()
        profile = Profile.objects.create(
            username = user,
            role = validated_data['role'],
            name=validated_data['name']
        )
        profile.save()
        return user

class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
