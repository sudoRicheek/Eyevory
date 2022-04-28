from django.urls import path

from apis.api.views import (
	RegisterView,
	get_profile,
	# update_profile,
	# ChangePasswordView,
	# get_pastchecks,
	)

app_name = 'apis'
urlpatterns = [
	path('register/', RegisterView, name='auth_register'),
    # path('signup/', registration_view, name='user-api-signup'),
    path('profile/', get_profile, name='user-api-profile-view'),
    # path('update/', update_profile, name='account-api-profile-update'),
	# path('upassword/', ChangePasswordView.as_view(), name='account-api-change-password'),
	# path('pastchecks/', get_pastchecks, name='account-api-get-pastchecks')
]