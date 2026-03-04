import requests
url = "http://localhost:8000/moje_konto/{}"
for i in range(10):
    response = requests.get(url.format(i))

    if response.status_code != 200:
        print(f"error for id {i}: {response.status_code}")
        continue
    if response.json()["data"]:
        print(f"user accesed {i}")
        print(response.json()["data"])
