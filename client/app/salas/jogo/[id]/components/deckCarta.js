import { useContext, useEffect } from "react";
import ItemCarta from "./itemCarta.js";
import UserContext from "@/app/context/userContext.js";

export default function DeckCarta({ deck_jogador, idUsuarioHost, jogo_id, par_id, ordem, esconder, rotate, cor, is_row , is_right, rodada}) {

    const { user } = useContext(UserContext);

    useEffect(() =>{

    }, [])

    if(par_id != idUsuarioHost){
        esconder = true;
    }

    return (
        <div className={`text-white p-2 flex-fill`}>
            <div className={`col-12 d-flex ${is_row ? 'flex-row' : 'flex-column'} justify-content-center align-items-start`}>
                {deck_jogador.map((carta, index) => (
                    <div 
                        key={index} 
                        style={{ 
                            transform: `rotate(${rotate[index]}deg)`, 
                            alignSelf: is_right ? 'flex-end' : 'auto',
                            marginRight: is_right ? '10px' : '0px',
                            padding: rotate ? '0px' : '0px'
                        }}
                    >
                        <ItemCarta rodada={rodada} jogo_id={jogo_id} esconde = {esconder} ordem={ordem} par_id={par_id} obj_carta={carta} />
                        {par_id}
                    </div>
                ))}
            </div>
        </div>
    );
}