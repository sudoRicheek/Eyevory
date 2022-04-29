from django.contrib import admin

# Register your models here.

from .models import Profile, Node

# Register your models here.

admin.site.register(Profile)
admin.site.register(Node)
