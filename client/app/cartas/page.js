"use client";

import ItemCarta from "./components/itemCarta.js";
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

function MeuComponente() {
  const [cartas, setCartas] = useState(null);
  const [loading, setLoading] = useState(true);

  let socket = useRef();
  const URL = "http://localhost:5000";

  function entrou() {
    alert("Entrou");
  }

  function emitir() {
    socket.current.emit("teste", { codSala: "123" });
  }

  function carregarCartas() {
    fetch("http://localhost:5000/carta", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setCartas(data);
        setLoading(false);
      })
      .catch((ex) => {
        console.log(ex);
        setLoading(false);
      });
  }

  useEffect(() => {
    socket.current = io(URL, {
      query: {
        codSala: "1",
        nome: "Daniel",
      },
    });

    socket.current.on("teste", carregarCartas);

    socket.current.on("entrou", entrou);

    return () => {
      socket.current.off("teste", carregarCartas);
      socket.current.off("entrou", entrou);
    };
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!cartas) {
    return <div>Erro ao carregar cartas</div>;
  }

return (
    <div className="container h-100 p-5 my-5 border border-dark rounded">
        <div className="d-flex flex-column h-100">
            <div className="bg-primary text-white p-2 flex-shrink-0">
                <div className="row justify-content-center">
                    <div className="col-12 d-flex flex-wrap justify-content-center">
                        CIMA
                        {cartas.deck_jogador1.map((carta, index) => (
                            <div key={index}>
                                <ItemCarta obj_carta={carta} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="d-flex flex-grow-1">
                <div className="bg-success text-white p-2 flex-fill">
                    <div className="col-12 d-flex flex-column align-items-center">
                        ESQUERDA
                        {cartas.deck_jogador2.map((carta, index) => (
                            <div key={index} style={{ transform: "rotate(90deg)", margin: -10 }}>
                                <ItemCarta obj_carta={carta} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-success text-white p-2 flex-fill">
                    MEIO
                    <div className="col-12 d-flex flex-wrap justify-content-center">
                        <img
                            src={cartas.vira.imagem_carta}
                            alt="vira"
                            style={{
                                width: "50px",
                                position: "absolute",
                                top: "20%",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        />
                    </div>
                </div>
                <div className="bg-success text-white p-2 flex-fill">
                    <div className="col-12 d-flex flex-column align-items-center">
                        DIREITA
                        {cartas.deck_jogador3.map((carta, index) => (
                            <div key={index} style={{ transform: "rotate(90deg)", margin: -10 }}>
                                <ItemCarta obj_carta={carta} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-danger text-white p-2 flex-shrink-0">
                <div className="col-12 d-flex flex-wrap justify-content-center">
                    BAIXO
                    {cartas.deck_jogador4.map((carta, index) => (
                        <ItemCarta key={index} obj_carta={carta} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);
}

export default MeuComponente;
