from django.contrib import admin

# Register your models here.

from .models import Profile, SuperAdmin, Node, Admin, AdminNode, NormalUser, UserAdminNode

# Register your models here.

admin.site.register(Profile)
admin.site.register(SuperAdmin)
admin.site.register(Node)
admin.site.register(Admin)
admin.site.register(AdminNode)
admin.site.register(NormalUser)
admin.site.register(UserAdminNode)