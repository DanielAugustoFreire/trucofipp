import ItemPlayerIcon from "./itemPlayerIcon";

export default function ItemModal({ players = [], salas }){

    

    return (
                <div key={salas}>
                    <div 
                        className={`modal fade bd-example-modal-lg-${salas}`} 
                        id={`modal-sala-${salas}`} 
                        tabIndex="-1" 
                        role="dialog" 
                        aria-labelledby={`modal-sala-${salas}-label`} 
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-lg">
                            <div className="position-relative">
                                <div className="modal-content position-absolute top-0 start-0 p-4">
                                    <div className="container-grid p-2">
                                        {/* Mapeando os jogadores da sala */}
                                        {players.map((player, index) => (
                                            <ItemPlayerIcon key={index} modal={true} players={player} />
                                        ))}
                                    </div>
                                    <button className="btn bg-warning text-dark">Entrar na sala</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
    

}