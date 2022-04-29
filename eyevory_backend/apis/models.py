import email
from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User

class Roles(models.IntegerChoices):
    Super = 0, 'super'
    Admin = 1, 'admin'
    User = 2, 'user'

class Profile(models.Model):
    # User
    username = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile', editable=False)
    role = models.IntegerField(default=Roles.User, choices=Roles.choices)
    name = models.CharField(max_length=50, default='', null=False, blank=False)
    

    #def save(self, *args, **kwargs):
        #if not self.nick:
        #    self.nick = self.user.username
        #super().save(*args, **kwargs)

    def __str__(self):
        return self.username.username


class SuperAdmin(models.Model):
    profile = models.OneToOneField(Profile, primary_key=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.profile

class Node(models.Model):
    ip = models.CharField(max_length=15, primary_key=True)
    creator = models.ForeignKey(SuperAdmin, null=False, on_delete=models.CASCADE)


class Admin(models.Model):
    profile = models.OneToOneField(Profile, primary_key=True, on_delete=models.CASCADE)
    super_admin = models.ForeignKey(SuperAdmin, null=False, on_delete=models.CASCADE)
    granted_nodes = models.ManyToManyField(Node, through='AdminNode')

    def __str__(self):
        return self.profile

class AdminNode(models.Model):
    node = models.ForeignKey(Node, null=False, on_delete=models.CASCADE)
    admin = models.ForeignKey(Admin, null=False, on_delete=models.CASCADE)


class NormalUser(models.Model):
    profile = models.OneToOneField(Profile, primary_key=True, on_delete=models.CASCADE)
    super_admin = models.ForeignKey(SuperAdmin, null=False, on_delete=models.CASCADE)
    granted_nodes = models.ManyToManyField(AdminNode, through='UserAdminNode')

    def __str__(self):
        return self.profile

class UserAdminNode(models.Model):
    admin_node = models.ForeignKey(AdminNode, null=False, on_delete=models.CASCADE)
    user = models.ForeignKey(NormalUser, null=False, on_delete=models.CASCADE)

#def create_profile(sender, **kwargs):
#    if kwargs['created']:
#        user_profile = Profile.objects.create(User=kwargs['instance'])


#post_save.connect(create_profile, sender=User)