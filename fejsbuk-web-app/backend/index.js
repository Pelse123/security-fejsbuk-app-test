const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'portal',
    dateStrings: true,
})
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.get('/moje_konto/:id',(req,res)=>{
    const id = req.params.id;
    const q = "SELECT id, nazwa_uzytkownika, email, rola, utworzenie_konta AS utworzenie_konta,hasla FROM users WHERE id = ?;"
    const dane = [id]
    conn.query(q, dane , function (err, result) {
        if (err) {
            console.log(err);
        }else{
            res.json({data:result});
        }
    })

})
app.post('/rejestracja',(req,res)=>{
    const q = "INSERT INTO users (nazwa_uzytkownika, email, hasla, rola, utworzenie_konta) VALUES (?, ?, ?, 'user', NOW());"
    const nazwa_uzytkownika = req.body.nazwa_uzytkownika;
    const email = req.body.email;
    const hasla = req.body.hasla;
    const dane = [nazwa_uzytkownika, email, hasla];
    conn.query(q, dane , function (err, result) {
        if (err) {
            console.log(err);
        }else{
            res.json({data:result.insertId});
        }
    })

})
app.post('/logowanie',(req,res)=>{
    const email = req.body.email;
    const hasla = req.body.hasla;
    const nazwa_uzytkownika = req.body.nazwa_uzytkownika;
    const q = "SELECT id, nazwa_uzytkownika, email, hasla, rola FROM users WHERE email = ? and hasla = ? and nazwa_uzytkownika = ?;"
    const dane = [email,hasla,nazwa_uzytkownika];
    conn.query(q, dane , function (err, result) {
        if (err) {
            console.log(err);
        }else{
            res.json({data:result});
        }
    })
})
app.get('/posty',(req,res)=>{
    const q = "SELECT posts.id, posts.tresc, posts.utworzone, users.nazwa_uzytkownika FROM posts JOIN users ON posts.uzytkownik_id = users.id ORDER BY posts.utworzone DESC;"
    conn.query(q, function (err, result) {
        if (err) {
            console.log(err);
        }else{
            res.json({data:result});
        }
    })

})
app.post('/dodaj_post',(req,res)=>{
    const tresc = req.body.tresc;
    const uzytkownik_id = req.body.uzytkownik_id;

    const q = "INSERT INTO posts (tresc, uzytkownik_id, utworzone) VALUES (?, ?, NOW());"
    const dane = [tresc, uzytkownik_id];

    conn.query(q, dane,function (err, result) {
        if (err) {
            console.log(err);
        }else{
            res.json({data:result.insertId});
        }
    })

})
app.delete('/usun_posty',(req,res)=>{
    const q = "DELETE FROM posts WHERE id = ? AND uzytkownik_id = ?;"
    const uzytkownik_id = req.body.uzytkownik_id;
    const id = req.body.id;
    const dane = [id,uzytkownik_id];
    conn.query(q, dane , function (err, result) {
        if (err) {
            console.log(err);
        }else{
            res.json({data:result.affectedRows});
        }
    })

})
app.put('/edytuj_post', (req, res) => {
    const id = req.body.id;
    const uzytkownik_id = req.body.uzytkownik_id;
    const tresc = req.body.tresc;
    const q = "UPDATE posts SET tresc = ?, updated_at = NOW() WHERE id = ? AND uzytkownik_id = ?;";
    const dane = [tresc, id, uzytkownik_id];

    conn.query(q, dane, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Błąd serwera" });
        }
        res.json({ data: result.affectedRows });
    });
});
app.delete("/usun_uzytkownika-admin",(req,res)=>{
    const q = "DELETE FROM users WHERE id = ?;"
    const id = req.body.id;
    const dane = [id];
    conn.query(q, dane , function (err, result) {
        if (err) {
            console.log(err);
        }else{
            res.json({data:result.affectedRows});
        }
    })
})
app.delete("/usun_post_uzytkownika-admin",(req,res)=>{
    const q = "DELETE FROM posts WHERE id = ?;"
    const id = req.body.id;
    const dane = [id];
    conn.query(q, dane , function (err, result) {
        if (err) {
            console.log(err);
        }else{
            res.json({data:result.affectedRows});
        }
    })
})
app.get("/uzytkownicy", (req, res) => {
    conn.query("SELECT * FROM users", (err, result) => {
        if(err) return console.log(err);
        res.json({ data: result });
    });
});
app.listen(8000,()=>{
    console.log("Serwer działa na porcie 8000✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️");
})