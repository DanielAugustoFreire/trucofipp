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
                                            <ItemPlayerIcon key={player.id} modal={true} players={player} />
                                        ))}
                                    </div>

                                    {/* Alinhando texto e botão na mesma linha */}
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <h5 className="text-center mb-0">Aguarde o início da partida...</h5>
                                        <button className="btn bg-danger text-white">Sair da Sala</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
    );
    

}