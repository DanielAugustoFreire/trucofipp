
import { useEffect } from "react";
import ItemCarta from "./itemCarta.js";

export default function TomboCarta({vira}) {


    useEffect(() =>{

    })

return (
    <div className="bg-success text-white p-2 flex-fill d-flex justify-content-center align-items-center">
        <div className="d-flex flex-wrap justify-content-center align-items-center">
            <ItemCarta obj_carta={vira} />
        </div>
    </div>
    )
}

