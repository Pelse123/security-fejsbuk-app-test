import React from "react";

const Admin = ({ uzytkownicy, posty, Admin_usun_uzytkownika, Admin_usun_post }) => {
    return (
        <div className="container my-5">
            <h2 className="mb-4">Panel Administratora</h2>

            <div className="card mb-5 shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Użytkownicy</h5>
                </div>
                <div className="card-body p-0">
                    <table className="table mb-0">
                        <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nazwa użytkownika</th>
                            <th>Email</th>
                            <th>Rola</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {uzytkownicy.map((dane,i) => (
                            <tr key={i}>
                                <td>{dane.id}</td>
                                <td>{dane.nazwa_uzytkownika}</td>
                                <td>{dane.email}</td>
                                <td>{dane.rola}</td>
                                <td>
                                    <button
                                        className ={dane.rola==="admin" ? "btn btn-secondary btn-sm" : "btn btn-danger btn-sm" }
                                        onClick={() => Admin_usun_uzytkownika(dane.id)}
                                        disabled={dane.rola==="admin"}
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {uzytkownicy.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">Brak użytkowników</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-warning text-dark">
                    <h5 className="mb-0">Posty</h5>
                </div>
                <div className="card-body p-0">
                    <table className="table mb-0">
                        <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Treść</th>
                            <th>Użytkownik</th>
                            <th>Data</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {posty.map((dane,i) => (
                            <tr key={i}>
                                <td>{dane.id}</td>
                                <td>{dane.tresc}</td>
                                <td>{dane.nazwa_uzytkownika}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => Admin_usun_post(dane.id)}
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {posty.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">Brak postów</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
