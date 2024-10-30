

export default function ItemSala(props){

    const { sala } = props;


    return (
            <div>
                <div data-toggle="modal" data-target=".bd-example-modal-lg">
                    <div className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <div className="container">
                                <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-center">
                                        <div className="box bg-primary rounded-circle" style={{width: '40px', height: '40px'}}></div>
                                    </div>
                                    <div className="col-6 d-flex justify-content-center">
                                        <div className="box bg-primary rounded-circle" style={{width: '40px', height: '40px'}}></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 d-flex justify-content-center">
                                        <div className="box bg-success rounded-circle" style={{width: '40px', height: '40px'}}></div>
                                    </div>
                                    <div className="col-6 d-flex justify-content-center">
                                        <div className="box bg-success rounded-circle" style={{width: '40px', height: '40px'}}></div>
                                    </div>
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
                                <div className="container-grid">
                                    <div className="box bg-primary"></div>
                                    <div className="box bg-primary"></div>
                                    <div className="box bg-success"></div>
                                    <div className="box bg-success"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )

}