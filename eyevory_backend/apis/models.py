import email
from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


class Profile(models.Model):
    # User
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile', editable=False)
    # email = models.CharField(max_length=50, default='', null=True, blank=True)

    #def save(self, *args, **kwargs):
        #if not self.nick:
        #    self.nick = self.user.username
        #super().save(*args, **kwargs)

    def __str__(self):
        return self.user.userName


def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = Profile.objects.create(user=kwargs['instance'])


post_save.connect(create_profile, sender=User)