"use client"

import { useEffect, useState } from "react";
import ItemSala from "./components/itemSala";
import httpClient from "../utils/httpClient";
import ItemModal from "./components/itemModal";


export default function Salas(){

    let [salas, setSalas] = useState([])
    let [players, setPlayers] = useState([])

    function carregarSalas() {
        httpClient.get("/sala")
            .then((res) => res.json())
            .then((data) => {
                let salas = [];
                let players = [];
    
                for (let i = 0; i < data.length; i++) {
                    let sala = {
                        id: data[i].sala_id,
                        nome: data[i].sala_name
                    };
    
                    let salaPlayers = [];
                    for (let j = 0; j < data[i].players.length; j++) {
                        let player = {
                            id: data[i].players[j].player_id,
                            nome: data[i].players[j].player_name,
                            time: data[i].players[j].player_time
                        };
                        salaPlayers.push(player);
                    }
    
                    sala.players = salaPlayers; // Adiciona os jogadores na sala
                    salas.push(sala); // Adiciona a sala ao array de salas
                }
    
                setSalas(salas); // Define o estado com as salas e seus jogadores
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
                    salas.map((sala, index) => {
                        console.log(sala, sala.players); // Certifique-se de acessar os jogadores da sala corretamente
                        return (
                            <>
                                <ItemSala sala={sala} players={sala.players} key={index}></ItemSala>
                                <ItemModal players={sala.players} salas={sala.id}></ItemModal>
                            </>
                        );
                    }) : <></>
                } 
    
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <button className="btn btn-primary rounded-circle" style={{ width: '50px', height: '50px' }}>+</button>
                </div>
            </div>
        </div>
    );
    
}   