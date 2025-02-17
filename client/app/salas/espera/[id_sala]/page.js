'use client'

import { useEffect, useRef, useState, useContext } from "react";
import httpClient from "@/app/utils/httpClient";
import ItemPlayerIcon from "../../components/itemPlayerIcon";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import UserContext from "@/app/context/userContext";

export default function SalaDeEspera({ params: { id_sala } }) {


    let [pronto, setPronto] = useState(0);
    let [equipes, setEquipes] = useState([]);
    let [players, setPlayers] = useState([]); 
    let [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    let socket = useRef();
    const URL = "http://localhost:5000";
    const router = useRouter();

    socket.current = io(URL);

    socket.current.on("InicioJogoFront", (data) => {
        if (data.sala_id === id_sala) {
            window.location.href = `/salas/jogo/${data.jogo_id}`;
        }
    });

    socket.current.on("SalaCarregadaEspera", (data) => {
        carregarSalaDeEspera();
    });

    socket.current.on("tudoCarregadoEspera", (data) => {
        setEquipes(data.entrar_equipe);
        setPlayers(data.players);
    });

    socket.current.on("jogadoresPronto", () => {
        let valorset = pronto + 1;
        setPronto(valorset); 

        if(valorset == 4){
            alert(valorset);
        }
    });

    function emitirPronto(){
        socket.current.emit("Pronto");
        const botao = document.getElementById("botaoPronto");
        botao.disabled = true;
    }

    function emitirSocket(entrar_equipe, players) {
        socket.current.emit("SalaCarregadaEspera", { entrar_equipe, players });
    }

    function jogoJaIniciou(){
        httpClient.get(`/jogo/existe/${id_sala}`)
        .then((res) => {
            if(res.status != 200){
                return false;
            }
            return res.json();
        })
        .then((data) => {
            if(data){
                window.location.href = `/salas/jogo/${data[0].jog_id}`;
            }
        })
    }

    function IniciarJogo(sala_id){
        httpClient.get(`/jogo/${sala_id}`)
        .then((res) => {
            if(res.status === 200){
                return res.json();
            }
        })
        .then((data) => {
            if(data){
                let msg = {
                    sala_id : sala_id,
                    jogo_id : data
                }
                socket.current.emit("IniciarJogo", msg);
                window.location.href = `/salas/jogo/${data}`;
            }
        })
    }

    function carregarSalaDeEspera() {
        httpClient.get(`/sala/${id_sala}`)
            .then((res) => {
                if (res.status !== 200) {
                    alert("Sala não encontrada");
                    router.push(`/salas`);
                    throw new Error("Sala não encontrada");
                }
                return res.json();
            })
            .then((data) => {
                // Extraindo os nomes e IDs das equipes
                const { equipe_1, equipe_2, equipe_1_id, equipe_2_id, players } = data;

                if(players.length == 4){
                    jogoJaIniciou();
                }
                
                // Definindo os dados das equipes
                const entrar_equipe = {
                    eqp1: equipe_1,
                    eqp2: equipe_2,
                    eqp1id: equipe_1_id,
                    eqp2id: equipe_2_id,
                };

                let erro = true;
                for(let i = 0; i < players.length; i++){
                    if(user.id == players[i].player_id){
                        erro = false;
                        break;
                    }
                }
                if(erro){
                    emitirSocket(entrar_equipe, players);
                    alert("Você não está na sala");
                    router.push(`/salas`);
                    throw new Error("Você não está na sala");
                }


                let msg = {
                    entrar_equipe: entrar_equipe,
                    players: players
                }


                emitirSocket(entrar_equipe, players);
                setEquipes(entrar_equipe);
                setPlayers(players);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    function sairDaSala(){
        httpClient.delete(`/participante/sairSala/${user.id}`)
        .then((res) => {
            if(res.status === 200){
                carregarSalaDeEspera();
                return res.json();
            }
        })
        .then((data) => {
            if(data){
                router.push(`/salas`);
            }
        })
    }

    useEffect(() => {   
        let id_jogo =  jogoJaIniciou(id_sala)
        if(!id_jogo){
            carregarSalaDeEspera();
        }
        }, []);

    const backgroundStyle = {
        backgroundImage: 'url(/img/imgEspera.jpg)', // Caminho correto para a pasta public
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw'
    };

    if (loading) {
        return (
            <LoadingSpinner tamanho={5} tamanho_imagem={100}></LoadingSpinner>
        );
    }

    return (
        <div style={backgroundStyle}>
            <div 
                style={{
                    color: 'white',
                    fontSize: '25px',
                    position: 'absolute', 
                    bottom: '10px', // distância do canto inferior
                    left: '10px',   // distância do canto esquerdo
                    marginRight: '10px' 
                }}
            >
                <p>Aguardando jogadores para iniciar a partida...</p>
            </div>

            <div
                className="container-grid"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
                    zIndex: 1000
                }}
            >
                <div className="container-grid" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                    <div className="team" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {players.length > 0 && players.map((player, index) => {
                            // Verifica se o jogador pertence à equipe 1 ou equipe 2
                            const nomeEquipe = player.player_time === equipes.eqp1id ? equipes.eqp1 : equipes.eqp2;

                            return (
                                <ItemPlayerIcon 
                                    key={player.player_id} 
                                    modal={true} 
                                    players={player} 
                                    team={nomeEquipe} 
                                />
                            );
                        })}
                    </div>
                </div>
                <button onClick={sairDaSala} className="bg-danger btn text-white container-grid">Sair da Sala</button>
                <button id="botaoPronto" onClick={emitirPronto} className="bg-success btn text-white container-grid">Pronto</button>
                <h1 className="texto" style={{ color: "white"}}>{pronto} / 4</h1>
            </div>
        </div>
    );
}
