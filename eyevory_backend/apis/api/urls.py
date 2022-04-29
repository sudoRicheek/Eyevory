from django.urls import path

from apis.api.views import (
	RegisterView,
	get_profile,
	list_nodes,
	add_node,
	delete_node
	# update_profile,
	# ChangePasswordView,
	# get_pastchecks,
	)

app_name = 'apis'
urlpatterns = [
	path('register/', RegisterView, name='auth_register'),
    path('profile/', get_profile, name='user-api-profile-view'),
	path('addnode/', add_node, name='user-add-node'),
	path('deletenode/', delete_node, name='user-delete-node'),
	path('listnodes/', list_nodes, name='available-nodes')
    # path('update/', update_profile, name='account-api-profile-update'),
	# path('upassword/', ChangePasswordView.as_view(), name='account-api-change-password'),
	# path('pastchecks/', get_pastchecks, name='account-api-get-pastchecks')
]