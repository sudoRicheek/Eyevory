from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    # User
    username = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile', editable=False)
    isadmin = models.IntegerField(default=0, null=False)
    name = models.CharField(max_length=50, default='', null=False, blank=False)

    def __str__(self):
        return self.username.username

class Node(models.Model):
    ip = models.GenericIPAddressField(primary_key=True)


#def create_profile(sender, **kwargs):
#    if kwargs['created']:
#        user_profile = Profile.objects.create(User=kwargs['instance'])


#post_save.connect(create_profile, sender=User)