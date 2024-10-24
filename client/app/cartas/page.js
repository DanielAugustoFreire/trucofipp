'use client'

import ItemCarta from './components/itemCarta.js';
import React, { useEffect, useState } from 'react';

function MeuComponente() {
    const [cartas, setCartas] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function carregarCartas() {
            fetch("http://localhost:5000/carta", {
                credentials: 'include'
            })
            .then(r => r.json())
            .then(data => {
                console.log(data);
                setCartas(data); 
                setLoading(false); 
            })
            .catch(ex => {
                console.log(ex);
                setLoading(false);
            });
        }

        carregarCartas();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!cartas) {
        return <div>Erro ao carregar cartas</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Manilha</h1>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Código: {cartas.manilha.cod_carta}</td>
                                <td>Valor: {cartas.manilha.carta_valor}</td>
                                <td>Naipe: {cartas.manilha.carta_naipe}</td>
                                <td><img src={cartas.manilha.imagem_carta} alt="Manilha" style={{ width: '50px' }} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h1>Deck do Jogador 1</h1>
                    <table className="table">
                        <tbody>
                            {cartas.deck_jogador1.map((carta, index) => (
                                <ItemCarta obj_carta={carta}></ItemCarta>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-6">
                    <h1>Deck do Jogador 2</h1>
                    <table className="table">
                        <tbody>
                            {cartas.deck_jogador2.map((carta, index) => (
                                <ItemCarta obj_carta={carta}></ItemCarta>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h1>Deck do Jogador 3</h1>
                    <table className="table">
                        <tbody>
                            {cartas.deck_jogador3.map((carta, index) => (
                                <ItemCarta obj_carta={carta}></ItemCarta>

                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-6">
                    <h1>Deck do Jogador 4</h1>
                    <table className="table">
                        <tbody>
                            {cartas.deck_jogador4.map((carta, index) => (
                                <ItemCarta obj_carta={carta}></ItemCarta>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MeuComponente;
