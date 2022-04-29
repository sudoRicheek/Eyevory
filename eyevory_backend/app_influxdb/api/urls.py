from django.urls import path

from app_influxdb.api.views import (
	get_alerts,
	get_processes,
	get_query_output,
	get_usage_cpu,
	get_usage_mem,
	update_thresholds,
	)

app_name = 'app_influxdb'
urlpatterns = [
	path('get_usage_cpu/', get_usage_cpu, name='influxdb-api-cpu'),
	path('get_usage_mem/', get_usage_mem, name='influxdb-api-mem'),
	path('get_processes/', get_processes, name='influxdb-api-processes'),
	path('get_query_output/', get_query_output, name='influxdb-api-query-panel'),
	path('get_alerts/', get_alerts, name='influxdb-api-alerts'),
	path('update_thresholds/', update_thresholds, name='influxdb-api-update-thresholds')
]
