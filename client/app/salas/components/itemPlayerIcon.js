export default function ItemPlayerIcon(props) {
    const { players, modal } = props;

    return (
        modal ? (
            <div className={`box ${players.time === 1 ? 'bg-primary' : 'bg-success'}`}>
                {players.id}, {players.nome}, {players.time}
            </div>
        ) : (
            <div className="col-6 d-flex justify-content-center">
                <div className="box bg-secondary rounded-circle" style={{ width: '40px', height: '40px' }}></div>
            </div>
        )
    );
}
