"use client"

import { useEffect, useState } from "react";
import ItemSala from "./components/itemSala";
import httpClient from "../utils/httpClient";


export default function Salas(){

    let [salas, setSalas] = useState([])
    let [players, setPlayers] = useState([])

    function carregarSalas(){
        httpClient.get("/sala")
        .then((res) => res.json())
        .then((data) => {
            setSalas(data); 
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function carregarSalasSemNet(){
        let data = [{
            id: 3,
            nome: "Sala 3",
            usuario_nome: "Daniel"
        },  ]
        let players = [{
            id: 1,
            nome: "Daniel",
            time: 1
        },{
            id: 2,
            nome: "João",
            time: 2
        },{
            id: 3,
            nome: "Maria",
            time: 1
        },{
            id: 4,
            nome: "José",
            time: 2
        }]
        setPlayers(players)
        setSalas(data)
    }


    useEffect(() => {   
        carregarSalasSemNet();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Salas de Truco</h1>
            <div className="row">
                {
                    salas ? 
                    salas.map((sala, index) => {
                        return (
                            <ItemSala sala={sala} players={players} key={index}></ItemSala>
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