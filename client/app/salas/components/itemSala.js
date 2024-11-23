import ItemPlayerIcon from "./itemPlayerIcon.js";
import ItemModal from "./itemModal.js";

export default function ItemSala(props){

    const { sala } = props;
    const { players } = props;

    return (
        <div>
            <div data-toggle="modal" data-target={`.bd-example-modal-lg-${sala.id}`}>
                <div className="card mb-3 shadow-sm">
                    <div className="card-body">
                        <div className="container">
                        <div className="row mb-3">
                        {players.map((player, index) => (
                            index < 2 && <ItemPlayerIcon key={player.id} player={player} />
                        ))}
                        {players.map((player, index) => (
                            index >= 2 && index < 4 && <ItemPlayerIcon key={player.id} player={player} />
                        ))}

                        </div>

                        </div>
                        <h5 className="card-title text-center mt-3">{sala.nome}</h5>
                    </div>
                </div>
            </div>

        </div>
    )

}