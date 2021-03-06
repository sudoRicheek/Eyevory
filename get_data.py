import influxdb_client

bucket = "testing"
org = "Eyevory"
token = "i4RVgHl6-PjzA4KlN9qoqZrShTayWYzce5b3auUcI2zjuenBLIL22F1GhfuMdokgO1FOxTSa5r-o-vF0zyQJ0g=="
url = "http://localhost:8086"

client = influxdb_client.InfluxDBClient(
   url=url,
   token=token,
   org=org
)

query_api = client.query_api()

def get_usage_cpu():
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

  result_cpu_usage = {}
  result_cpu_usage['system'] = result_system[0].records[-1].get_value()
  result_cpu_usage['user'] = result_user[0].records[-1].get_value()
  result_cpu_usage['idle'] = result_idle[0].records[-1].get_value()
  result_cpu_usage['iowait'] = result_iowait[0].records[-1].get_value()

  return result_cpu_usage

def get_usage_mem():
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

  result_mem = {}
  result_mem['active'] = result_active[0].records[-1].get_value()
  result_mem['inactive'] = result_inactive[0].records[-1].get_value()
  result_mem['available'] = result_available[0].records[-1].get_value()
  result_mem['used'] = result_used[0].records[-1].get_value()
  result_mem['dirty'] = result_dirty[0].records[-1].get_value()

  return result_mem

def get_processes():
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

  return result_proc

print(get_usage_cpu())
print("-----------")
print(get_usage_mem())
print("-----------")
print(get_processes())