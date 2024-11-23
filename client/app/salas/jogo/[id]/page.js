"use client";

import DeckCarta from "./components/deckCarta.js";
import TomboCarta from "./components/tomboCarta.js";
import IconeJogo from "./components/iconJogo.js";
import React, { useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import UserContext from "@/app/context/userContext.js";

function MeuComponente({params: { id }}) {
  
  const [cartas, setCartas] = useState(null);
  const [loading, setLoading] = useState(true);

  let socket = useRef();
  const URL = "http://localhost:5000";

  const { setUser } = useContext(UserContext);


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

    let storedUser = null;
    if (typeof window !== 'undefined') {
      storedUser = localStorage.getItem('usuario');
      if (storedUser != null) {
          setUser(JSON.parse(storedUser));
      }
  }

    socket.current = io(URL);

    socket.current.emit("ValidarPessoasSala", {
      id_sala: id,
      user: storedUser
    }, [])

    
    socket.current.on("CarregarCartas", (data) => {
      console.log("Mensagem recebida do backend:", data);
      carregarCartas();
    });

    socket.current.on("Negado", (data) => {
      window.location.href = "http://localhost:3000/salas";
    });
    
    return () => {
      socket.current.off("CarregarCartas", (data) => {
        console.log(data)
        carregarCartas();
      });
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
      <IconeJogo protagonista={true}></IconeJogo>
      <div className="d-flex">
      <IconeJogo></IconeJogo>
        <div className="d-flex flex-column flex-grow-1">
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
        <IconeJogo></IconeJogo>
      </div>
      <IconeJogo protagonista={true}></IconeJogo>
    </div>
  );
}

export default MeuComponente;
