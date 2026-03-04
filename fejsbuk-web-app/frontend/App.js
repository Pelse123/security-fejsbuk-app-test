import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaUser, FaUserShield } from 'react-icons/fa';
import Logowanie from './komponenty/logowanie';
import Admin from './komponenty/ADMIN';
import Glowna from './komponenty/glowna';
import MojProfil from './komponenty/moj_profil';

function App() {
    const [moje_konto, setMojeKonto] = useState([]);
    const [id,setId] = useState(0);
    const [posty,setPosty] = useState([]);
    const [stanZalogowania, setStanZalogowania] = useState(null);
    const [uzytkownik,setUzytkownik] = useState();
    const [login,setLogin] = useState("");
    const [uzytkownicy, setUzytkownicy] = useState([]);
    const wyswietl_konto=()=>{
        fetch(`http://localhost:8000/moje_konto/${id}`)
            .then(res=>res.json())
            .then(res => {setMojeKonto(res.data[0]);})
            .catch(err=>{console.log(err)})
    }
    const logowanie = (email,nazwa_uzytkownika,hasla)=>{
        fetch(`http://localhost:8000/logowanie`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                email,hasla,nazwa_uzytkownika
            })
        })
            .then(res=>res.json())
            .then((data)=>{

                if(data.data && data.data.length > 0){
                    setUzytkownik(data.data[0].rola);
                    setId(data.data[0].id);
                    setLogin(data.data[0].nazwa_uzytkownika);
                    setStanZalogowania(true);
                    setMojeKonto(data.data[0]);
                    alert("ZALOGOWANO POMYŚLNIE, WITAJ " + data.data[0].nazwa_uzytkownika);

                }else{
                    alert("Nieprawidłowy login lub hasło!")
                }
        }).catch(err=>{console.log(err)})
    }
    const rejestracja = (email,nazwa_uzytkownika,hasla)=>{
        fetch(`http://localhost:8000/rejestracja/`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                nazwa_uzytkownika,email,hasla
            })
        }).then(res=>res.json())
            .then((data)=>{
                if(data.data){
                    alert("Rejestracja udana!" + data.data);
                }else{
                    alert("Coś poszło nie tak 🤔")
                }
            })
            .catch(err=>{console.log(err)})
    }

    const dodaj_posty = (tresc,uzytkownik_id)=>{
        fetch(`http://localhost:8000/dodaj_post`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                tresc,uzytkownik_id
            })
        }).then(res=>res.json())
            .then((data)=>{
                wyswietl_posty()
                if(data.data){
                    alert("Dodano post! " + data.data);
                }else{
                    alert("Coś poszło nie tak 🤔")
                }
            })
            .catch(err=>{console.log(err)})
    }

    const wyswietl_posty=()=>{
        fetch(`http://localhost:8000/posty`)
            .then(res=>res.json())
            .then(res => {setPosty(res.data);})
            .catch(err=>{console.log(err)})
    }

    const wyswietl_uzytkownikow=()=>{
        fetch(`http://localhost:8000/uzytkownicy`)
            .then(res=>res.json())
            .then(res => {setUzytkownicy(res.data);})
            .catch(err=>{console.log(err)})
    }

    const edytuj_post=(id,uzytkownik_id,tresc)=>{
        fetch(`http://localhost:8000/edytuj_post`,{
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                tresc,id,uzytkownik_id
            })
        }).then(res=>res.json())
            .then((data)=>{
                if(data.data){
                    alert("Edytowano post! " + data.data);
                    wyswietl_posty()
                }else{
                    alert("Coś poszło nie tak 🤔")
                }
            }).catch(err=>{console.log(err)})
    }

    const edytuj_konto=(nazwa_uzytkownika,email,hasla,id)=>{
        fetch(`http://localhost:8000/edytuj_uzytkownika`,{
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                nazwa_uzytkownika,email,hasla,id
            })
        }).then(res=>res.json())
            .then((data)=>{
                if(data.data){
                    alert("Edytowano użytkownika! " + data.data);
                    wyswietl_konto()
                }else{
                    alert("Coś poszło nie tak 🤔")
                }
            }).catch(err=>{console.log(err)})
    }

    const Admin_usun_post=(id)=>{
        fetch(`http://localhost:8000/usun_post_uzytkownika-admin`,{
            method:'DELETE',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                id
            })
        }).then(res=>res.json())
            .then((data)=>{
                if(data.data){
                    alert("Usunieto post przez Administratora! " + data.data);
                    wyswietl_posty()
                }else{
                    alert("Coś poszło nie tak 🤔")
                }
            }).catch(err=>{console.log(err)})
    }

    const Admin_usun_uzytkownika=(id)=>{
        fetch(`http://localhost:8000/usun_uzytkownika-admin`,{
            method:'DELETE',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                id
            })
        }).then(res=>res.json())
            .then((data)=>{
                if(data.data){
                    alert("Usunięto użytkownika! " + data.data);
                    wyswietl_uzytkownikow()
                }else{
                    alert("Coś poszło nie tak 🤔")
                }
            }).catch(err=>{console.log(err)})
    }

    const fetchit = async () => {
        wyswietl_konto();
        wyswietl_posty();
        wyswietl_uzytkownikow();
    }
    useEffect(() => {
        fetchit();
    },[])

    if(!stanZalogowania) {
        return <Logowanie logowanie = {logowanie}  rejestracja = {rejestracja}/>
    }

  return (
      <div>
          <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container">
                  <div className="navbar-brand"><strong>Fejsbuk</strong></div>
                  <div className="d-flex align-items-center">
                      <div className="me-2">
                          <Link to="/">
                          <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                              <FaHome />
                          </button>
                          </Link>
                      </div>
                      <div className="me-2">
                          <Link to={`/moj_profil/${id}`}>
                          <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                              <FaUser />
                          </button>
                              </Link>
                      </div>
                      {uzytkownik === "admin" && (
                          <div className="me-2">
                              <Link to="/admin!">
                            <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                                <FaUserShield />
                            </button>
                              </Link>
                          </div>
                      )}

                      <button className="btn btn-outline-light ms-3" onClick={()=>{setStanZalogowania(null); alert("NASTĄPIŁO WYLOGOWANIE!")}}>
                          Wyloguj
                      </button>


                  </div>
              </div>
          </nav>
              <div className="container mt-5">
                  <Routes>
                      <Route path="/" element={<Glowna dodaj_posty = {dodaj_posty} posty = {posty} id={id} login = {login} edytuj_posty={edytuj_post}/>}/>
                      <Route path={`/moj_profil/${id}`} element={<MojProfil moje_konto = {moje_konto} edytuj_konto = {edytuj_konto}/>}/>
                      <Route
                          path="/admin!"
                          element={
                              <Admin
                                  uzytkownicy={uzytkownicy}
                                  posty={posty}
                                  Admin_usun_uzytkownika={Admin_usun_uzytkownika}
                                  Admin_usun_post={Admin_usun_post}
                              />
                          }
                      />
                  </Routes>
              </div>
          </BrowserRouter>
      </div>

  );
}

export default App;
