import ItemPlayerIcon from "./itemPlayerIcon.js";

export default function ItemSala(props){

    const { sala } = props;
    const { players } = props;

    return (
            <div>
                <div data-toggle="modal" data-target=".bd-example-modal-lg">
                    <div className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <div className="container">
                                <div className="row mb-3">
                                    <ItemPlayerIcon></ItemPlayerIcon>
                                    <ItemPlayerIcon></ItemPlayerIcon>
                                </div>
                                <div className="row">
                                    <ItemPlayerIcon></ItemPlayerIcon>
                                    <ItemPlayerIcon></ItemPlayerIcon>
                                </div>
                            </div>
                            <h5 className="card-title text-center mt-3">{sala.nome}</h5>
                            <p className="card-text text-center text-muted">Criador: {sala.usuario_nome}</p>
                        </div>
                    </div>
                </div>


                <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="position-relative">
                            <div className="modal-content position-absolute top-0 start-0 p-4">
                                <div className="container-grid p-2">
                                    <ItemPlayerIcon modal={true} players={players[0]}></ItemPlayerIcon>
                                    <ItemPlayerIcon modal={true} players={players[1]}></ItemPlayerIcon>
                                    <ItemPlayerIcon modal={true} players={players[2]}></ItemPlayerIcon>
                                    <ItemPlayerIcon modal={true} players={players[3]}></ItemPlayerIcon>
                                </div>
                                    <button className="btn bg-warning text-dark">Entrar na sala</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )

}