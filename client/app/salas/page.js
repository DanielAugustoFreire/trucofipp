"use client"

import { useEffect, useState, useContext, useRef } from "react";
import ItemSala from "./components/itemSala";
import httpClient from "../utils/httpClient";
import ItemModal from "./components/itemModal";
import UserContext from "../context/userContext";
import { io } from "socket.io-client";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRouter } from "next/navigation";



export default function Salas(){

    const {user} = useContext(UserContext)
    const router = useRouter();

    let nomeSala = useRef();
    let nomeEquipe1 = useRef();
    let nomeEquipe2 = useRef();


    let [salas, setSalas] = useState([])
    let [loading, setLoading] = useState(true)
    
    let socket = useRef();
    const URL = "http://localhost:5000";
    
    socket.current = io(URL);

    async function verificarUsuarioEstaEmSala() {
        try {
            const res = await httpClient.get(`/participante/validarDisponibilidade/${user.id}`);
            
            if (res.status === 200) {
                const data = await res.json(); // Garantir que o JSON é processado corretamente
                
                if (data.ok) {
                    if (data.jogo_id) {
                        return router.push(`/salas/jogo/${data.jogo_id}`);
                    }
                    return router.push(`/salas/espera/${data.sala_id}`);
                }
            }
        } catch (error) {
            console.error("Erro ao verificar a disponibilidade do usuário:", error);
        }
    }

    function saveRoom(){
        let objSala = {
            nome: nomeSala.current.value,
            usuario_id: user.id,
            equipe1: nomeEquipe1.current.value,
            equipe2: nomeEquipe2.current.value
        }
        httpClient.post("/sala", objSala)
        .then(response => {
            if(response.status === 201){
                return response.json();
            }else{
                return false;
            }
        })
        .then(data => {
            if(data){
                window.location.reload();
            }else{
                alert("Dados invalidos");
            }
        });
    }

    
    function carregarSalas() {
        httpClient.get("/sala")
            .then((res) => res.json())
            .then((data) => {
                let salassss = [];
    
                data.forEach((sala) => {
                    let salaData = {
                        sala_id: sala.sala_id,
                        sala_name: sala.sala_name,
                        equipes: []
                    };
    
                    salaData.equipes.push({
                        equipe_id_1: sala.equipes[0]?.equipe_id_1,
                        equipe_name_1: sala.equipes[0]?.equipe_name_1,
                        equipe_id_2: sala.equipes[0]?.equipe_id_2,
                        equipe_name_2: sala.equipes[0]?.equipe_name_2,
                        players: []
                    });
    
                    if (Array.isArray(sala.equipes[0]?.players)) {
                        sala.equipes[0].players.forEach((player) => {
                            if (!player.playet_saida) {
                                salaData.equipes[0].players.push({
                                    player_id: player.player_id,
                                    player_name: player.player_name,
                                    player_time: player.player_time,
                                    playet_saida: player.playet_saida
                                });
                            }
                        });
                    }
    
                    salassss.push(salaData);
                });
    
                setSalas(salassss);
                socket.current.emit("CarregarSalas", salassss);
                setLoading(false); // Define o estado com as salas e seus jogadores
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }
    

    useEffect(() => {   
        verificarUsuarioEstaEmSala();
        carregarSalas();

        
        socket.current.on("SalasCarregadas", (data) => {
          setSalas(data);
          setLoading(false);
        });

    }, []);

    
    if(loading){
        return(
            <LoadingSpinner></LoadingSpinner>
        )
    }

  
    return (
        <div
            style={{
                backgroundImage: 'url(img/imgSalas.jpg)',
                height: "100vh",
                width: "100vw",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                margin: 0, // Remove margens extras
                padding: 0, // Remove padding extra
            }}
        >
        <div className="container-fluid" style={{ height: "100%", padding: 0 }}>
            {user.id + " " + user.nome + " " + user.email}
            
            <div className="row" style={{ gap: "20px", justifyContent: "center", padding: "20px" }}>
    {salas.length > 0 ? (
        salas.map((sala) => {
            // Combine todos os jogadores de todas as equipes da sala
            const allPlayersInSala = sala.equipes.flatMap((equipe) => equipe.players);

            if (sala.equipes[0].players.length <= 4) {
                return (

                    <div>
                        <ItemModal players={allPlayersInSala} salas={sala.sala_id} equipes={sala.equipes[0]} />
                    
                    <div
                        key={sala.sala_id}
                        className={`sala-${sala.sala_id}`}
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "12px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "20px",
                            margin: "10px",
                            maxWidth: "350px",
                            textAlign: "center",
                            transition: "transform 0.3s ease",
                            cursor: "pointer",
                            border: "1px solid #eaeaea",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        
                        <h4 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>
                            Sala {sala.sala_id}
                        </h4>
                        <p style={{ fontSize: "0.9rem", color: "#666", margin: "10px 0" }}>
                            Jogadores: {allPlayersInSala.length}
                        </p>
                        <ItemSala sala={sala} players={allPlayersInSala} />
                    </div>
                    </div>
                    
                );
            } else {
                return (
                    <div
                        key={sala.sala_id}
                        className={`sala-${sala.sala_id}`}
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "12px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "20px",
                            margin: "10px",
                            maxWidth: "350px",
                            textAlign: "center",
                            transition: "transform 0.3s ease",
                            cursor: "pointer",
                            border: "1px solid #eaeaea",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        <h4 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>
                            Sala {sala.sala_id}
                        </h4>
                        <p style={{ fontSize: "0.9rem", color: "#666", margin: "10px 0" }}>
                            Jogadores: {allPlayersInSala.length}
                        </p>
                        <ItemSala sala={sala} players={allPlayersInSala} />
                    </div>
                );
            }
        })
    ) : (
        <p className="text-center" style={{ color: "#777", fontStyle: "italic" }}>
            Nenhuma sala disponível.
        </p>
    )}
</div>

            <div className="d-flex justify-content-center align-items-center mt-4">
                <button className="btn btn-primary rounded-circle" style={{ width: "50px", height: "50px" }} data-toggle="modal" data-target="#myModal">
                    +
                </button>
            </div>

            <div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="myModalLabel">Título do Modal</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="roomForm">
                                <div className="form-group">
                                    <label>Nome da Sala</label>
                                    <input ref={nomeSala} type="text" className="form-control" id="roomName" />
                                </div>
                                <div className="form-group">
                                    <label>Nome da Equipe 1</label>
                                    <input ref={nomeEquipe1} type="text" className="form-control" id="team1" />
                                </div>
                                <div className="form-group">
                                    <label>Nome da Equipe 2</label>
                                    <input ref={nomeEquipe2} type="text" className="form-control" id="team2" />
                                </div>
                            </form>
                            <p>O usuário que criar a sala entrará na equipe 1.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-dark" onClick={saveRoom}>
                                Criar Sala
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
