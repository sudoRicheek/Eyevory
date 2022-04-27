from rest_framework import serializers

from apis.models import Profile

from django.contrib.auth.models import User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['userId', 'userName', 'Name', 'Email', 'SuperAdmin']


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['userName', 'password', 'password2']
        extra_kwargs = {
                'password': {'write_only': True}
        }

    def save(self):
        user = User(
            userName=self.validated_data['userName'],
            )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords Must Match'})

        user.set_password(password)
        user.save()
        return user
