from django.urls import path

from apis.api.views import (
	RegisterView,
	approve,
	get_profile,
	get_user_requets,
	granted_nodes,
	list_nodes,
	list_users,
	request_node
	# update_profile,
	# ChangePasswordView,
	# get_pastchecks,
	)

app_name = 'apis'
urlpatterns = [
	path('register/', RegisterView, name='auth_register'),
    path('profile/', get_profile, name='user-api-profile-view'),
	path('listnodes/', list_nodes, name='available-nodes'),
	path('request/', request_node, name='requesting-node'),
	path('listgrants/', granted_nodes, name='list-granted-nodes'),
	path('listusers/', list_users, name='list-all-users'),
	path('request/user/', get_user_requets, name='user-requests'),
	path('approve/user', approve, name='approve-requests')
    # path('update/', update_profile, name='account-api-profile-update'),
	# path('upassword/', ChangePasswordView.as_view(), name='account-api-change-password'),
	# path('pastchecks/', get_pastchecks, name='account-api-get-pastchecks')
]