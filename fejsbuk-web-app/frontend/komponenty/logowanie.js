import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
const Logowanie = ({logowanie,rejestracja}) => {
    const [tryb,setTryb] = useState(null);
    const [emailLocal, setEmailLocal] = useState("");
    const [loginLocal, setLoginLocal] = useState("");
    const [hasloLocal, setHasloLocal] = useState("");
    const handleLogowanie = (e) => {
        e.preventDefault();
        logowanie(emailLocal, loginLocal, hasloLocal);
    }
    const handleRejestracja = (e) => {
        e.preventDefault();
        rejestracja(emailLocal, loginLocal, hasloLocal);
    }
    if (!tryb) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
                <div className="text-center">
                    <h2 className="mb-4">Wybierz akcję</h2>
                    <button className="btn btn-primary me-2" onClick={() => setTryb("logowanie")}>Zaloguj się</button>
                    <button className="btn btn-success" onClick={() => setTryb("rejestracja")}>Zarejestruj się</button>
                </div>
            </div>
        );
    }else{
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
                <div className="card p-4 shadow" style={{ minWidth: "300px", maxWidth: "400px", width: "100%" }}>
                    <h2 className="card-title text-center mb-4">
                        {tryb === "logowanie" ? "Logowanie" : "Rejestracja"}
                    </h2>

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={emailLocal}
                            onChange={(e) => setEmailLocal(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Login"
                            value={loginLocal}
                            onChange={(e) => setLoginLocal(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Hasło"
                            value={hasloLocal}
                            onChange={(e) => setHasloLocal(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className={`btn w-100 ${tryb === "logowanie" ? "btn-primary" : "btn-success"}`}
                        onClick={tryb === "logowanie" ? handleLogowanie : handleRejestracja}
                    >
                        {tryb === "logowanie" ? "Zaloguj" : "Zarejestruj się"}
                    </button>

                    <button
                        className="btn btn-link w-100 mt-2"
                        onClick={() => setTryb(null)}
                    >
                        Powrót do wyboru akcji
                    </button>
                </div>
            </div>
        );
    }

}
export default Logowanie;