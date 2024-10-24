

export default function ItemCarta({obj_carta}){

    return (
        <tr>
            <td>Código: {obj_carta.cod_carta}</td>
            <td>Valor: {obj_carta.carta_valor}</td>
            <td>Naipe: {obj_carta.carta_naipe}</td>
            <td><img src={obj_carta.imagem_carta} alt={`Carta ${obj_carta.cod_carta}`} style={{ width: '50px' }} /></td>
        </tr>
    )

}