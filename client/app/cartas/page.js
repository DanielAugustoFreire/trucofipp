"use client";

import DeckCarta from "./components/deckCarta.js";
import TomboCarta from "./components/tomboCarta.js";
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
    socket.current = io(URL);

    socket.current.emit("HandShake", {  // ENVIA MENSAGEM PARA O BACKEND
      mensagem: "Front -> Back"
    })

    socket.current.on("CarregarCartas", carregarCartas);

    return () => {
      socket.current.off("CarregarCartas", carregarCartas);
    }

  }, [])



  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!cartas) {
    return <div>Erro ao carregar cartas</div>;
  }

return (
  <div className="container p-5 my-5 border border-dark rounded" style={{ width: "80%", height: "80%" }}>
    <div className="d-flex flex-column h-100">
      <DeckCarta deck_jogador={cartas.deck_jogador1} rotate={0} cor={"primary"} is_row={true}></DeckCarta>
      <div className="d-flex flex-grow-1">
        <DeckCarta deck_jogador={cartas.deck_jogador2} rotate={[85, 90, 95]} cor={"warning"}></DeckCarta>
        <div className="d-flex flex-column bg-secondary" style={{ width: "10%" }}>
          <div className="bg-dark" style={{ flex: 1 }}></div>
          <div className="bg-secondary" style={{ flex: 1 }}></div>
        </div>
        <TomboCarta vira={cartas.vira}></TomboCarta>
        <div className="d-flex flex-column bg-secondary" style={{ width: "10%" }}>
          <div className="bg-secondary" style={{ flex: 1 }}></div>
          <div className="bg-dark" style={{ flex: 1 }}></div>
        </div>
        <DeckCarta deck_jogador={cartas.deck_jogador3} rotate={[95, 90, 85]} cor={"danger"} is_right={true}></DeckCarta>
      </div>
      <DeckCarta deck_jogador={cartas.deck_jogador4} rotate={0} cor={"info"} is_row={true}></DeckCarta>
    </div>
  </div>
);
}

export default MeuComponente;
