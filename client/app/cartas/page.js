'use client'

import { useEffect, useState } from "react"

export default function Cartas(){

    const [cartas, setCartas] = useState([]);

    function carregarCartas(){

        fetch("http://localhost:5000/carta",{
            credentials: 'include'
        })
        .then(r => {
            return r.json()
        })
        .then(data => {
            console.log(data)
            setCartas(data)
        })
        .catch(ex => {
            console.log(ex)
        })


    }

    useEffect(() => {
        carregarCartas()
    }, [])
    

    return (
        <div className="container">
        <h1 className="my-4">Cartas</h1> 
        <div className="row">
            <div className="col-12 mb-4">
                <div className="card"></div>
                    <div className="card-header">
                    </div>
                    <div className="card-body d-flex justify-content-around">
                        {cartas.deck_jogador && cartas.deck_jogador.map((carta, cartaIndex) => {
                            return (
                                <div key={cartaIndex} className="text-center">
                                    <img src={carta.image} alt={carta.code} className="img-fluid" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )

}