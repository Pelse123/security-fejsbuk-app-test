import requests
url = "http://localhost:8000/dodaj_post"
test = "<script>alert('TESTXSS');</script>"
data={
    "tresc":test,
    "uzytkownik_id":1
}
response = requests.post(url,json=data)
if response.json()["data"]:
    print("XSS inserted")
else:
    print("error")