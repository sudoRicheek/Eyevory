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

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass

@admin.register(SuperAdmin)
class SuperAdminAdmin(admin.ModelAdmin):
    pass

@admin.register(Node)
class NodeAdmin(admin.ModelAdmin):
    pass

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    pass

@admin.register(AdminNode)
class AdminNodeAdmin(admin.ModelAdmin):
    pass

@admin.register(NormalUser)
class NormalUserAdmin(admin.ModelAdmin):
    pass

@admin.register(UserAdminNode)
class UserAdminNodeAdmin(admin.ModelAdmin):
    pass
