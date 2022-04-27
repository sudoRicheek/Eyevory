from django.urls import path

from app_influxdb.api.views import (
	get_data,
	)

app_name = 'app_influxdb'
urlpatterns = [
	path('data/', get_data, name='app_influxdb-api-upload'),
]
