"use client"

import { useEffect, useState } from "react";


export default function Salas(){

    let [salas, setSalas] = useState([])

    function carregarSalas(){
        fetch("http://localhost:5000/sala")
        .then((res) => res.json())
        .then((data) => {
            setSalas(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }


    useEffect(() => {
        carregarSalas();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Salas de Truco</h1>
            <div className="row">
                {
                    salas ? 
                    salas.map((value, index) => {
                        return (
                            <div key={index} className="col-4 d-flex justify-content-center align-items-center mb-4">
                                <div className="card text-center bg-dark text-white" style={{ width: '18rem' }}>
                                    <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ height: '200px' }}>
                                        <h5 className="card-title">{value.nome}</h5>
                                        <p className="card-text">{value.usuario_id}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    }) :<></>
                }
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <button className="btn btn-primary rounded-circle" style={{ width: '50px', height: '50px' }}>+</button>
                </div>
            </div>
        </div>
    );
}   