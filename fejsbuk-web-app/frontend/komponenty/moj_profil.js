import { useState } from "react";

const MojProfil = ({ moje_konto,edytuj_konto }) => {
    const [edytuj, setEdytuj] = useState(null);

    const [login,setLogin] = useState(moje_konto.nazwa_uzytkownika);
    const [email,setEmail] = useState(moje_konto.email);
    const [haslo,setHaslo] = useState(moje_konto.hasla);

    const ustaw = (e)=>{
        e.preventDefault();
        edytuj_konto(login,email,haslo,moje_konto.id);
        setEdytuj(null);

    }
    return (
        <div className="container my-5" style={{ maxWidth: "700px" }}>
            <div className="card shadow-sm p-4">
                {edytuj !== moje_konto.id ? (
                    <>
                        <div className="d-flex align-items-center mb-4">
                            <div
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%",
                                    background: "#dee2e6",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    color: "#6c757d",
                                    textTransform: "uppercase",
                                    marginRight: "15px"
                                }}
                            >
                                {moje_konto.nazwa_uzytkownika[0]}
                            </div>

                            <div>
                                <h4 className="m-0">{moje_konto.nazwa_uzytkownika}</h4>
                                <small className="text-muted">ID: {moje_konto.id}</small>
                            </div>
                        </div>

                        <hr />

                        <div className="mb-3">
                            <h6>Email:</h6>
                            <p className="text-secondary">{moje_konto.email}</p>
                        </div>

                        <div className="mb-3">
                            <h6>Data dołączenia:</h6>
                            <p className="text-secondary">{moje_konto.utworzenie_konta}</p>
                        </div>

                        <div className="mb-3">
                            <h6>Rola:</h6>
                            <p className="text-secondary">{moje_konto.rola}</p>
                        </div>

                        <button
                            className="btn btn-primary w-100"
                            onClick={() => setEdytuj(moje_konto.id)}
                        >
                            Edytuj profil
                        </button>
                    </>
                ) : (
                    <form onSubmit={ustaw}>
                        <div className="mb-3">
                            <label htmlFor="nazwa_uzytkownika" className="form-label">
                                Nazwa użytkownika
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="nazwa_uzytkownika"
                                name="nazwa_uzytkownika"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="haslo" className="form-label">
                                Nowe hasło
                            </label>
                            <input
                                type="input"
                                className="form-control"
                                id="haslo"
                                name="haslo"
                                value={haslo}
                                onChange={(e) => setHaslo(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100" >
                            Zapisz zmiany
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MojProfil;
