import requests

url = "http://127.0.0.1:8000"
print ("===Task 1===")
print ("a)")
response = requests.get(url)
print("test:",response.request.url)
print("response: " + response.text)
print("")

print ("b)")
response = requests.get(url + "/Asia/Tomsk")
print("test: " + response.request.url)
print("response: " + response.text)
print("")

print ("===Task 2===")
json = {"date":"03.17.2021 20:21:05",
        "tz":"EST", 
        "target_tz":"GMT"}
response = requests.post(url + "/api/v1/convert", json=json)
print("test: " + response.request.url)
print(f"data_json: {response.request.body}")
print("response: " + response.text)
print("")

print ("===Task 3===")
print ("a)")
json = {"date":"03.17.2021 12:00:00", 
        "tz":"GMT", 
        "target_tz":"EST"}
response = requests.post(url + "/api/v1/convert", json=json)
print("test: " + response.request.url)
print(f"data_json: {response.request.body}")
print("response: " + response.text)
print("")

print ("b)")
json = {"first_date":"03.17.2021 12:00:00",
        "first_tz":"Europe/Moscow",
        "second_date":"03.17.2021 12:00:00",
        "second_tz":"Asia/Tomsk"}
response = requests.post(url + "/api/v1/datediff", json=json)
print("test: " + response.request.url)
print(f"data_json: {response.request.body}")
print("response: " + response.text + " sec.")




