import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const Glowna = ({ dodaj_posty, posty, id, login, edytuj_posty }) => {
    const [tresc, setresc] = useState("");
    const [filtr, setfiltr] = useState("wszystkie");

    const [edytowanyPost, setEdytowanyPost] = useState(null);
    const [nowaTresc, setNowaTresc] = useState("");

    const DodajHandle = (e) => {
        e.preventDefault();
        dodaj_posty(tresc, id);
        setresc("");
    };

    const filtr_postow = (e) => {
        if (filtr === "moje") return e.nazwa_uzytkownika === login;
        return true;
    };

    const zapiszEdycje = (id_posta) => {
        edytuj_posty(id_posta,id, nowaTresc);
        setEdytowanyPost(null);
        setNowaTresc("");
    };

    return (
        <div className="container my-4" style={{ maxWidth: "600px" }}>

            <div className="card mb-4 p-3">
                <textarea
                    className="form-control mb-2"
                    rows="3"
                    placeholder="Co słychać?"
                    value={tresc}
                    onChange={(e) => setresc(e.target.value)}
                />
                <button className="btn btn-primary w-100" onClick={DodajHandle}>
                    Dodaj post
                </button>
            </div>

            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-outline-secondary" onClick={() => setfiltr("wszystkie")}>
                    Wszystkie
                </button>
                <button className="btn btn-outline-secondary" onClick={() => setfiltr("moje")}>
                    Moje posty
                </button>
            </div>

            <div className="d-flex flex-column gap-3">
                {posty.filter(filtr_postow).map((dane, i) => (
                    <div key={i} className="card p-3 shadow-sm">

                        <div className="d-flex justify-content-between">
                            <strong>{dane.nazwa_uzytkownika}</strong>

                            {dane.nazwa_uzytkownika === login && (
                                <FaEdit
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        setEdytowanyPost(dane.id);
                                        setNowaTresc(dane.tresc);
                                    }}
                                />
                            )}
                        </div>

                        {edytowanyPost === dane.id ? (
                            <div className="mt-2">
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    value={nowaTresc}
                                    onChange={(e) => setNowaTresc(e.target.value)}
                                />

                                <div className="d-flex gap-2 mt-2">
                                    <button
                                        className="btn btn-success w-50"
                                        onClick={() => zapiszEdycje(dane.id)}
                                    >
                                        Zapisz
                                    </button>
                                    <button
                                        className="btn btn-danger w-50"
                                        onClick={() => setEdytowanyPost(null)}
                                    >
                                        Anuluj
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="mt-2">{dane.tresc}</p>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Glowna;
