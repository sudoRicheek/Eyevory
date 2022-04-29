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
)

query_api = client.query_api()

############################ Prediction Parameters and Data Structures #######################
CPU_IDLE_TIME = []
MEM_AVAILABLE = []

CPU_IDLE_THRESHOLD = 90                 # 90% of the time idle
MEM_AVAILABLE_THRESHOLD = 2147483648    # 2GB for now

##############################################################################################

@api_view(['POST', ])
@authentication_classes([])
@permission_classes([])
def get_query_output(request):
    if request.method == "POST":
        if request.data.get('query', None) is None:
            return Response({'query': "This field is needed!"}, status=status.HTTP_403_FORBIDDEN)
        
        result_query = query_api.query(org=org, query=request.data.get('query', None).strip())
        output = json.dumps(result_query[0], cls=FluxStructureEncoder, indent=2)
        return Response(output, status=status.HTTP_200_OK)


@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def get_usage_cpu(request):
    global CPU_IDLE_TIME

    query_cpu_system = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "cpu" and r.cpu == "cpu-total" and r._field == "usage_system")'
    query_cpu_user = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "cpu" and r.cpu == "cpu-total" and r._field == "usage_user")'
    query_cpu_idle = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "cpu" and r.cpu == "cpu-total" and r._field == "usage_idle")'
    query_cpu_iowait = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "cpu" and r.cpu == "cpu-total" and r._field == "usage_iowait")'

    result_system = query_api.query(org=org, query=query_cpu_system)
    result_user = query_api.query(org=org, query=query_cpu_user)
    result_idle = query_api.query(org=org, query=query_cpu_idle)
    result_iowait = query_api.query(org=org, query=query_cpu_iowait)

    if len(CPU_IDLE_TIME) >= 10:
        CPU_IDLE_TIME = CPU_IDLE_TIME[1:]
    CPU_IDLE_TIME += [result_idle]

    result_cpu_usage = {}
    result_cpu_usage['system'] = result_system[0].records[-1].get_value()
    result_cpu_usage['user'] = result_user[0].records[-1].get_value()
    result_cpu_usage['idle'] = result_idle[0].records[-1].get_value()
    result_cpu_usage['iowait'] = result_iowait[0].records[-1].get_value()

    return Response(result_cpu_usage, status=status.HTTP_200_OK)


@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def get_usage_mem(request):
    global MEM_AVAILABLE

    query_mem_active = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "mem" and r._field == "active")'
    query_mem_inactive = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "mem" and r._field == "inactive")'
    query_mem_available = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "mem" and r._field == "available")'
    query_mem_used = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "mem" and r._field == "used")'
    query_mem_dirty = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "mem" and r._field == "dirty")'

    result_active = query_api.query(org=org, query=query_mem_active)
    result_inactive = query_api.query(org=org, query=query_mem_inactive)
    result_available = query_api.query(org=org, query=query_mem_available)
    result_used = query_api.query(org=org, query=query_mem_used)
    result_dirty = query_api.query(org=org, query=query_mem_dirty)

    if len(MEM_AVAILABLE) >= 10:
        MEM_AVAILABLE = MEM_AVAILABLE[1:]
    MEM_AVAILABLE += [result_available]

    result_mem = {}
    result_mem['active'] = result_active[0].records[-1].get_value()
    result_mem['inactive'] = result_inactive[0].records[-1].get_value()
    result_mem['available'] = result_available[0].records[-1].get_value()
    result_mem['used'] = result_used[0].records[-1].get_value()
    result_mem['dirty'] = result_dirty[0].records[-1].get_value()

    return Response(result_mem, status=status.HTTP_200_OK)


@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def get_processes(request):
    query_proc_total = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "processes" and r._field == "total")'
    query_proc_running = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "processes" and r._field == "running")'
    query_proc_sleeping = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "processes" and r._field == "sleeping")'
    query_proc_zombies = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "processes" and r._field == "zombies")'
    query_proc_idle = 'from(bucket:"testing")\
        |> range(start: -1m)\
        |> filter(fn:(r) => r._measurement == "processes" and r._field == "idle")'

    result_total = query_api.query(org=org, query=query_proc_total)
    result_running = query_api.query(org=org, query=query_proc_running)
    result_sleeping = query_api.query(org=org, query=query_proc_sleeping)
    result_zombies = query_api.query(org=org, query=query_proc_zombies)
    result_idle = query_api.query(org=org, query=query_proc_idle)

    result_proc = {}
    result_proc['total'] = result_total[0].records[-1].get_value()
    result_proc['running'] = result_running[0].records[-1].get_value()
    result_proc['sleeping'] = result_sleeping[0].records[-1].get_value()
    result_proc['zombies'] = result_zombies[0].records[-1].get_value()
    result_proc['idle'] = result_idle[0].records[-1].get_value()

    return Response(result_proc, status=status.HTTP_200_OK)

@api_view(['GET', ])
@authentication_classes([])
@permission_classes([])
def get_alerts(request):
    CPU_TOO_MUCH_IDLE = False
    if CPU_IDLE_TIME[-1] > CPU_IDLE_THRESHOLD:
        CPU_TOO_MUCH_IDLE = True

    MEM_AVAILABLE_LOW = False
    if MEM_AVAILABLE[-1] < MEM_AVAILABLE_THRESHOLD:
        MEM_AVAILABLE_LOW = True
    
    slope, intercept, _, _, _ = linregress(np.range(10), MEM_AVAILABLE)
    TIME_THRESHOLD_CROSS = (MEM_AVAILABLE_THRESHOLD - intercept)/slope
    TIME_THRESHOLD_CROSS = 0 if TIME_THRESHOLD_CROSS < 0 else TIME_THRESHOLD_CROSS

    data = {}
    data["cpu_idle_warning"] = CPU_TOO_MUCH_IDLE
    data["mem_available_low_warning"] = MEM_AVAILABLE_LOW
    data["time_mem_threshold_cross"] = TIME_THRESHOLD_CROSS

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