import ItemPlayerIcon from "./itemPlayerIcon.js";


export default function ItemSala(props){

    const { sala } = props;
    const { players } = props;

    let playersEntrar = [];

    let subs

    if(players != null){
        for(let i = 0; i < players.length; i++){
            if(players[i].playet_saida == null){
                playersEntrar.push(players[i]);
            }
        }
    }

    return (
        <div>
            <div data-toggle="modal" data-target={`.bd-example-modal-lg-${sala.sala_id}`}>
                <div className="card mb-3 shadow-sm">
                    <div className="card-body">
                        <div className="container" >
                        <div className="row mb-3">
                        {playersEntrar.map((player, index) => {
                            if (index < 2) {
                                return <ItemPlayerIcon key={player.player_id} player={player}/>;
                            } else if (index >= 2) {
                                return <ItemPlayerIcon key={player.player_id} player={player} />;
                            }
                            return null;
                        })}


                        </div>

                        </div>
                        <h5 className="card-title text-center" style={{ fontSize: '24px' }}>
                        {sala.sala_name}</h5>
                    </div>
                </div>
            </div>

        </div>
    )

}