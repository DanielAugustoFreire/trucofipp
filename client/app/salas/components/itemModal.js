import ItemPlayerIcon from "./itemPlayerIcon";
import UserContext from "@/app/context/userContext";
import httpClient from "@/app/utils/httpClient";
import { useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";


export default function ItemModal({ players = [], salas, equipes }){


    let socket = useRef();
    const URL = "http://localhost:5000";
    
    socket.current = io(URL);

    let playersEntrar = [];

    for(let i = 0; i < players.length; i++){
        if(players[i].playet_saida == null){
            playersEntrar.push(players[i]);
        }
    }
            

    const {user} = useContext(UserContext)
    

    function EntrarNaSala(sala_id, equipe_id){
        httpClient.get(`/participante/validarDisponibilidade/${user.id}`)
        .then((res) => {
            if(res.status === 200){
                return res.json()
            }
            alert("Voce Nao pode entrar em mais de uma sala");
        })
        .then((data) => {
            if(data){
                let body = {
                    usuario_id : user.id,
                    sala_id : sala_id,
                    equipe_id : equipe_id
                }

                httpClient.post("/sala/inserirParticipante", body)
                .then((res) => {
                    if(res.status === 201){
                        return res.json();
                    }
                })
                .then((data) => {
                    if(data){
                        socket.current.emit("CarregarSalas", salas);
                        socket.current.emit("CarregarSalasEspera");
                        window.location.href = `/salas/espera/${sala_id}`;
                    }
                })
            }
        })
    }



    return (
                <div key={salas}>
                    <div 
                        className={`modal fade bd-example-modal-lg-${salas}`} 
                        id={`modal-sala-${salas}`} 
                        tabIndex="-1" 
                        role="dialog" 
                        aria-labelledby={`modal-sala-${salas}-label`} 
                        aria-hidden="true"
                    >


                    {/*modal */} 
                        <div className="modal-dialog modal-lg">
                            <div className="position-relative">
                                <div className="modal-content position-absolute top-0 start-0 p-4">
                                        Aguardando Jogadores para iniciar a partida...  
                                    <div className="container-grid p-2">
                                        {/* Mapeando os jogadores da sala */}
                                        {playersEntrar.map((player, index) => (
                                            <ItemPlayerIcon key={player.player_id} modal={true} players={player} />
                                        ))}
                                    </div>

                            {/* Alinhando texto e botão na mesma linha */}
                              <div className="d-flex justify-content-between align-items-center mt-3">
                                <h5 className="text-center mb-0">
                                    <div className="spinner-border text-danger" role="status">
                                        <span className=""><img src="/img/cartas-icon.png" width="50px"></img></span>
                                    </div>
                                </h5>
                                <button onClick={() => EntrarNaSala(salas, equipes.equipe_id_1)} className="btn bg-success text-white">Entrar na {equipes.equipe_name_1}</button>
                                <button onClick={() => EntrarNaSala(salas, equipes.equipe_id_2)} className="btn bg-success text-white">Entrar na {equipes.equipe_name_2}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
    

}