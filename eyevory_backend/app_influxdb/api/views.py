from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.response import Response

import json
import numpy as np
from scipy.stats import linregress
import influxdb_client
from influxdb_client.client.flux_table import FluxStructureEncoder
from sqlalchemy import TIME

# Richeek: 7asssEiVPEvIdlr-PR1XMg9cKxNI5xSfgkICYVOZw8QTm_CxRUVADPKhG4aM79BEBz-HOwe92VlcNL3XID8A5g==

bucket = "test"
org = "eyevory"
token = "7asssEiVPEvIdlr-PR1XMg9cKxNI5xSfgkICYVOZw8QTm_CxRUVADPKhG4aM79BEBz-HOwe92VlcNL3XID8A5g=="
url = "http://localhost:8086"

client = influxdb_client.InfluxDBClient(
    url=url,
    token=token,
    org=org,
    headers={"Content-Type": "application/vnd.flux"}
)

query_api = client.query_api()

############################ Prediction Parameters and Data Structures #######################
CPU_IDLE_TIME = {}
MEM_AVAILABLE = {}

CPU_IDLE_THRESHOLD = 90                 # 90% of the time idle
MEM_AVAILABLE_THRESHOLD = 1             # 1GB for now
##############################################################################################


############################ Multiple Servers ################################################
HOSTS = []
##############################################################################################

@api_view(['POST', ])
@authentication_classes([])
@permission_classes([])
def get_query_output(request):
    if request.method == "POST":
        if request.data.get('query', None) is None:
            return Response({'query': "This field is needed!"}, status=status.HTTP_403_FORBIDDEN)
        
        result_query = query_api.query(org=org, query=request.data.get('query', None).strip())
        output = json.dumps(result_query, cls=FluxStructureEncoder, indent=2)
        return Response(output, status=status.HTTP_200_OK)


@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def get_usage_cpu(request):
    global CPU_IDLE_TIME

    query_cpu_system = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "cpu" and r.cpu == "cpu-total" and r._field == "usage_system"'
    query_cpu_user = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "cpu" and r.cpu == "cpu-total" and r._field == "usage_user"'
    query_cpu_idle = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "cpu" and r.cpu == "cpu-total" and r._field == "usage_idle"'
    query_cpu_iowait = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "cpu" and r.cpu == "cpu-total" and r._field == "usage_iowait"'

    queries_hosts = {}
    for host in HOSTS:
        queries_hosts[host+"_cpu_system"] = query_cpu_system + ' and r.host == ' + '"' + host + '")',
        queries_hosts[host+"_cpu_user"] = query_cpu_user + ' and r.host == ' + '"' + host + '")',
        queries_hosts[host+"_cpu_idle"] = query_cpu_idle + ' and r.host == ' + '"' + host + '")',
        # queries_hosts[host+"_cpu_iowait"] = query_cpu_iowait + ' and r.host == ' + '"' + host + '")'

    results_hosts = {}
    for host in HOSTS:
        results_hosts[host+"system"] = query_api.query(org=org, query=queries_hosts[host+"_cpu_system"][0])
        results_hosts[host+"user"] = query_api.query(org=org, query=queries_hosts[host+"_cpu_user"][0])
        results_hosts[host+"idle"] = query_api.query(org=org, query=queries_hosts[host+"_cpu_idle"][0])
        # results_hosts[host+"iowait"] = query_api.query(org=org, query=queries_hosts[host+"_cpu_iowait"][0])

    result_cpu_usage = {}
    for host in HOSTS:
        result_cpu_usage[host+'system'] = results_hosts[host+"system"][0].records[-1].get_value()
        result_cpu_usage[host+'user'] = results_hosts[host+"user"][0].records[-1].get_value()
        result_cpu_usage[host+'idle'] = results_hosts[host+"idle"][0].records[-1].get_value()
        # result_cpu_usage[host+'iowait'] = results_hosts[host+"iowait"][0].records[-1].get_value()

    for host in HOSTS:
        if host not in CPU_IDLE_TIME:
            CPU_IDLE_TIME[host] = [0]
    
    for host in HOSTS:
        if len(CPU_IDLE_TIME[host]) >= 10:
            CPU_IDLE_TIME[host] = CPU_IDLE_TIME[host][1:]
        CPU_IDLE_TIME[host] += [result_cpu_usage[host+'idle']]

    return Response(result_cpu_usage, status=status.HTTP_200_OK)


@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def get_usage_mem(request):
    global MEM_AVAILABLE

    query_mem_active = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "mem" and r._field == "active"'
    query_mem_inactive = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "mem" and r._field == "inactive"'
    query_mem_available = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "mem" and r._field == "available"'
    query_mem_used = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "mem" and r._field == "used"'
    query_mem_dirty = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "mem" and r._field == "dirty"'

    queries_hosts = {}
    for host in HOSTS:
        queries_hosts[host+"_mem_active"] = query_mem_active + ' and r.host == ' + '"' + host + '")',
        queries_hosts[host+"_mem_inactive"] = query_mem_inactive + ' and r.host == ' + '"' + host + '")',
        queries_hosts[host+"_mem_available"] = query_mem_available + ' and r.host == ' + '"' + host + '")',
        # queries_hosts[host+"_mem_used"] = query_mem_used + ' and r.host == ' + '"' + host + '")'
        # queries_hosts[host+"_mem_dirty"] = query_mem_dirty + ' and r.host == ' + '"' + host + '")'

    results_hosts = {}
    for host in HOSTS:
        results_hosts[host+"active"] = query_api.query(org=org, query=queries_hosts[host+"_mem_active"][0])
        results_hosts[host+"inactive"] = query_api.query(org=org, query=queries_hosts[host+"_mem_inactive"][0])
        results_hosts[host+"available"] = query_api.query(org=org, query=queries_hosts[host+"_mem_available"][0])
        # results_hosts[host+"used"] = query_api.query(org=org, query=queries_hosts[host+"_mem_used"][0])
        # results_hosts[host+"dirty"] = query_api.query(org=org, query=queries_hosts[host+"_mem_dirty"][0])

    result_mem_usage = {}
    for host in HOSTS:
        result_mem_usage[host+"active"] = results_hosts[host+"active"][0].records[-1].get_value()
        result_mem_usage[host+'inactive'] = results_hosts[host+"inactive"][0].records[-1].get_value()
        result_mem_usage[host+'available'] = results_hosts[host+"available"][0].records[-1].get_value()
        # result_mem_usage[host+'used'] = results_hosts[host+"used"][0].records[-1].get_value()
        # result_mem_usage[host+'dirty'] = results_hosts[host+"dirty"][0].records[-1].get_value()

    for host in HOSTS:
        if host not in MEM_AVAILABLE:
            MEM_AVAILABLE[host] = [0]
    
    for host in HOSTS:
        if len(MEM_AVAILABLE[host]) >= 10:
            MEM_AVAILABLE[host] = MEM_AVAILABLE[host][1:]
        MEM_AVAILABLE[host] += [result_mem_usage[host+'available']]

    return Response(result_mem_usage, status=status.HTTP_200_OK)


@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def get_processes(request):
    query_proc_total = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "processes" and r._field == "total"'
    query_proc_running = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "processes" and r._field == "running"'
    query_proc_sleeping = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "processes" and r._field == "sleeping"'
    query_proc_zombies = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "processes" and r._field == "zombies"'
    query_proc_idle = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "processes" and r._field == "idle"'

    queries_hosts = {}
    for host in HOSTS:
        queries_hosts[host+"_total"] = query_proc_total + " and r.host == " + "\"" + host + "\")",
        queries_hosts[host+"_running"] = query_proc_running + " and r.host == " + "\"" + host + "\")",
        queries_hosts[host+"_sleeping"] = query_proc_sleeping + " and r.host == " + "\"" + host + "\")",
        # queries_hosts[host+"_zombies"] = query_proc_zombies+ " and r.host == " + "\"" + host + "\")"
        # queries_hosts[host+"_idle"] = query_proc_idle + " and r.host == " + "\"" + host + "\")"

    results_hosts = {}
    for host in HOSTS:
        results_hosts[host+"total"] = query_api.query(org=org, query=queries_hosts[host+"_total"][0])
        results_hosts[host+"running"] = query_api.query(org=org, query=queries_hosts[host+"_running"][0])
        results_hosts[host+"sleeping"] = query_api.query(org=org, query=queries_hosts[host+"_sleeping"][0])
        # results_hosts[host+"zombies"] = query_api.query(org=org, query=queries_hosts[host+"_zombies"][0])
        # results_hosts[host+"idle"] = query_api.query(org=org, query=queries_hosts[host+"_idle"][0])

    result_mem_usage = {}
    for host in HOSTS:
        result_mem_usage[host+"total"] = results_hosts[host+"total"][0].records[-1].get_value()
        result_mem_usage[host+'running'] = results_hosts[host+"running"][0].records[-1].get_value()
        result_mem_usage[host+'sleeping'] = results_hosts[host+"sleeping"][0].records[-1].get_value()
        # result_mem_usage[host+'zombies'] = results_hosts[host+"zombies"][0].records[-1].get_value()
        # result_mem_usage[host+'idle'] = results_hosts[host+"idle"][0].records[-1].get_value()

    return Response(result_mem_usage, status=status.HTTP_200_OK)

@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def get_alerts(request):
    CPU_TOO_MUCH_IDLE = {}
    for host in HOSTS:
        if CPU_IDLE_TIME[host][-1] > CPU_IDLE_THRESHOLD:
            CPU_TOO_MUCH_IDLE[host] = True

    MEM_AVAILABLE_LOW = {}
    for host in HOSTS:
        if MEM_AVAILABLE[host][-1] < MEM_AVAILABLE_THRESHOLD*1073741824:
            MEM_AVAILABLE_LOW[host] = True
    
    TIME_THRESHOLD_CROSS = {}
    for host in HOSTS:
        if len(MEM_AVAILABLE[host]) == 10:
            slope, intercept, _, _, _ = linregress(-np.arange(10)*10, MEM_AVAILABLE[host])
            if abs(slope) < 1e-6:
                TIME_THRESHOLD_CROSS[host] = 1e+9
            else:
                TIME_THRESHOLD_CROSS[host] = (MEM_AVAILABLE_THRESHOLD*1073741824 - intercept)/slope
                TIME_THRESHOLD_CROSS[host] = 0 if TIME_THRESHOLD_CROSS[host] < 0 else TIME_THRESHOLD_CROSS[host]
        else:
            TIME_THRESHOLD_CROSS[host] = 1e+9

    data = {}
    for host in HOSTS:
        data[host+"_cpu_idle_warning"] = CPU_TOO_MUCH_IDLE[host]
        data[host+"_mem_available_low_warning"] = MEM_AVAILABLE_LOW[host]
        data[host+"_time_mem_threshold_cross"] = TIME_THRESHOLD_CROSS[host]

    return Response(data, status=status.HTTP_200_OK)

@api_view(['PUT', ])
@authentication_classes([])
@permission_classes([])
def update_thresholds(request):
    global CPU_IDLE_THRESHOLD, MEM_AVAILABLE_THRESHOLD

    if request.data.get("cpu_idle_threshold", None) is None or request.data.get("mem_available_threshold", None) is None:
        return Response({"status": "Parameters needed"}, status=status.HTTP_400_BAD_REQUEST)
    
    CPU_IDLE_THRESHOLD = request.data.get("cpu_idle_threshold")
    MEM_AVAILABLE_THRESHOLD = request.data.get("mem_available_threshold")

    return Response({"status": "Thresholds Updated"}, status=status.HTTP_200_OK)

@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def get_thresholds(request):
    return Response({
        "cpu_idle_threshold": CPU_IDLE_THRESHOLD, 
        "mem_available_threshold": MEM_AVAILABLE_THRESHOLD
    }, status=status.HTTP_200_OK)


@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def get_available_servers(request):
    global HOSTS

    query_hosts = 'from(bucket:"public_bucket")\
        |> range(start: -1m)\
        |> drop(columns: ["_start", "_stop", "_field", "_measurement", "_value", "_time"])'
    
    result_hosts = query_api.query(org=org, query=query_hosts)

    hosts = []
    for result_host in result_hosts:
        for rec in result_host.records:
            hosts += [rec['host']]

    data = {}
    data["hosts"] = list(set(hosts))

    HOSTS = data["hosts"]

    return Response(data, status=status.HTTP_200_OK)
