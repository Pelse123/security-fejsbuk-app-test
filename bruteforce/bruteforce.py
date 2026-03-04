import requests

url = "http://localhost:8000/logowanie"

sample_passwords = ["admin123","123","haslo","haslo123"]

sample_emails=["admin@admin.com","ania@example.com","janek@example.com","test@test.pl"]

sample_usernames=["admin","ania","janek","test"]

for i in range(len(sample_usernames)):
    for j in range(len(sample_emails)):
        for k in range(len(sample_passwords)):
            response = requests.post(url,json={
                "hasla":sample_passwords[k],
                "email":sample_emails[j],
                "nazwa_uzytkownika":sample_usernames[i]
                                               })
            if response.json()["data"]:
                print(f"{sample_passwords[k]} {sample_emails[j]} {sample_usernames[i]} is found")
