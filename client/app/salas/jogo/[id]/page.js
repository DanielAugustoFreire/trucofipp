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
  const [ordem, setOrdem] = useState(1);
  const [idsParticipantes, setIdsParticipantes] = useState([]);
  const [idUsuarioHost, setIdUsuarioHost] = useState(null);
  const [tempo, setTempo] = useState();

  const cartasMAO1 = [];
  const cartasMAO2 = [];
  const cartasMAO3 = [];
  const cartasMAO4 = [];

  const { user } = useContext(UserContext);

  const router = useRouter();

  const socket = useRef();
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
      carregarCartas(data.data, data.ordem_atual);
    });

    socket.current.on("Negado_Id", (data) => {
      alert(data);
      router.push(`/salas`);
    });

    pegarIdUsuarioRoot();

    return () => socket.current.disconnect();
  }, []);

  if (loading) {
    return (
      <button
        onClick={() => gerarCartasMaoPartida(ordem)}
        className="btn btn-success btn-lg rounded-pill w-50 my-3"
      >
        Clique aqui para iniciar a partida
      </button>
    );
  }

  if (!cartas) return <div>Erro ao carregar cartas</div>;

  const backgroundStyle = {
    backgroundImage: "url(/img/imgLogin.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
  };

  return (
    <div style={backgroundStyle}>
      <div
        className="p-2"
        style={{
          width: "100%",
          height: "100%",
          
        }}
      >
        <div
          className="CanvaJogo p-2 border border-white rounded"
          style={{width: "100%", height: "100%" }}
        >
          <div>Mão: {ordem}</div>
          <IconeJogo protagonista />
          <div className="d-flex">
            <IconeJogo />
            <div className="d-flex flex-column flex-grow-1">
              {cartas.cards.map((carta) => {
                if (carta.par_id == idsParticipantes[0]) cartasMAO1.push(carta);
                else if (carta.par_id == idsParticipantes[1]) cartasMAO2.push(carta);
                else if (carta.par_id == idsParticipantes[2]) cartasMAO3.push(carta);
                else if (carta.par_id == idsParticipantes[3]) cartasMAO4.push(carta);
              })}
              <DeckCarta
                deck_jogador={cartasMAO1}
                idUsuarioHost={idUsuarioHost}
                par_id = {idsParticipantes[0]}
                rotate={0}
                cor="info"
                is_row
              />
              <div className="d-flex flex-grow-1">
                <DeckCarta
                idUsuarioHost={idUsuarioHost}
                  deck_jogador={cartasMAO2}
                  par_id = {idsParticipantes[1]}
                  rotate={[85, 90, 95]}
                  cor="warning"
                />
                <div className="d-flex flex-column" style={{ width: "10%" }}>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1 }}></div>
                </div>
                <TomboCarta vira={cartas.vira} />
                <div className="d-flex flex-column" style={{ width: "10%" }}>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1 }}></div>
                </div>
                <DeckCarta
                idUsuarioHost={idUsuarioHost}
                  deck_jogador={cartasMAO3}
                  par_id = {idsParticipantes[2]}
                  rotate={[95, 90, 85]}
                  cor="danger"
                  is_right
                />
              </div>
              <DeckCarta
                idUsuarioHost={idUsuarioHost}
                deck_jogador={cartasMAO4}
                par_id = {idsParticipantes[3]}
                rotate={0}
                jogo_id={id}
                rodada={cartas.rodada}
                ordem={ordem}
                cor="info"
                is_row
              />
            </div>
            <IconeJogo />
          </div>
          <IconeJogo protagonista />
        </div>
      </div>
    </div>
  );
}

export default MeuComponente;
