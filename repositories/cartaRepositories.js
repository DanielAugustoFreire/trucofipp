

export default class CartaRepositories {
    async obterTodos() {
        try {
            return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=3S,3D,3H,3C,2S,2D,2H,2C,AS,AD,AH,AC,KS,KD,KH,KC,JS,JD,JH,JC,QS,QD,QH,QC,7S,7D,7H,7C,6S,6D,6H,6C,5S,5D,5H,5C,4S,4D,4H,4C')
                .then(response => response.json())

        }
        catch(ex) {
            throw ex;
        }
    }
}