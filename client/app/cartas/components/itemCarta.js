

export default function ItemCarta({obj_carta}){

    return (
        <a style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
            <div><img src={obj_carta.imagem_carta} alt={`Carta ${obj_carta.cod_carta}`} style={{ width: '50px' }} /></div>
        </a>
    )

}