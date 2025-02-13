import UserContext from "@/app/context/userContext";
import httpClient from "@/app/utils/httpClient";
import { useContext, useRef } from "react";
import { io } from "socket.io-client";

export default function ItemCarta({ obj_carta, jogo_id, ordem, par_id, esconde, rodada }) {

    const { user } = useContext(UserContext);

    let socket = useRef();
    const URL = "http://localhost:5000";

    socket.current = io(URL);
    
    async function clicou(carta_id) {
        let body = {
            ordem: ordem,
            carta_id: carta_id,
            rodada_id: rodada,
            par_id: par_id
        }

        httpClient.post("/movimento", body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Erro ao realizar movimento");
                }
                return response.json();
            })
            .then((data) => {
                let enviar = {
                    par_id: par_id,
                    jogo_id: jogo_id
                }

                socket.current.emit("movimento", enviar);
            })
            .catch((ex) => {
                console.error(ex);
            });
    }

    return esconde ? (
        <div>

            <img
                src="/img/back-side.png"
                alt="Carta escondida"
                style={{ width: '50px' }}
            />
        </div>  
    ) : (
        <div onClick={() => clicou(obj_carta.carta_id? obj_carta.carta_id : obj_carta.car_id)} href="#">
            <img
                src={obj_carta.imagem_carta? obj_carta.imagem_carta : obj_carta.car_imagem}
                alt={`Carta ${obj_carta.cod_carta? obj_carta.cod_carta : obj_carta.car_codigo}`}
                style={{ width: '50px' }}
            />
        </div>
    );
}
