

export default function ItemCarta({obj_carta}){

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {/*<div style={{ marginRight: '10px' }}>Código: {obj_carta.cod_carta}</div>
            <div style={{ marginRight: '10px' }}>Valor: {obj_carta.carta_valor}</div>
            <div style={{ marginRight: '10px' }}>Naipe: {obj_carta.carta_naipe}</div>*/}
            <div><img src={obj_carta.imagem_carta} alt={`Carta ${obj_carta.cod_carta}`} style={{ width: '50px' }} /></div>
        </div>
    )

}