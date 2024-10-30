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
                            <div>
                                <div data-toggle="modal" data-target=".bd-example-modal-lg">
                                    <div key={index} className="card mb-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="container">
                                                <div className="row mb-3">
                                                    <div className="col-6 d-flex justify-content-center">
                                                        <div className="box bg-primary rounded-circle" style={{width: '40px', height: '40px'}}></div>
                                                    </div>
                                                    <div className="col-6 d-flex justify-content-center">
                                                        <div className="box bg-secondary rounded-circle" style={{width: '40px', height: '40px'}}></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 d-flex justify-content-center">
                                                        <div className="box bg-success rounded-circle" style={{width: '40px', height: '40px'}}></div>
                                                    </div>
                                                    <div className="col-6 d-flex justify-content-center">
                                                        <div className="box bg-danger rounded-circle" style={{width: '40px', height: '40px'}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 className="card-title text-center mt-3">{value.nome}</h5>
                                            <p className="card-text text-center text-muted">{value.usuario_id}</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="position-relative">
                                            <div className="modal-content position-absolute top-0 start-0 p-4">
                                                <div className="container-grid">
                                                    <div className="box bg-primary"></div>
                                                    <div className="box bg-secondary"></div>
                                                    <div className="box bg-success"></div>
                                                    <div className="box bg-danger"></div>
                                                </div>
                                            </div>
                                        </div>
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