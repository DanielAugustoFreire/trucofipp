import { useEffect } from "react";
import ItemCarta from "./itemCarta.js";

export default function DeckCarta({ deck_jogador, rotate, cor, is_row , is_right}) {

    useEffect(() =>{

    })

    return (
        <div className={`bg-${cor} text-white p-2 flex-fill`}>
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
                        <ItemCarta obj_carta={carta} />
                    </div>
                ))}
            </div>
        </div>
    );
}