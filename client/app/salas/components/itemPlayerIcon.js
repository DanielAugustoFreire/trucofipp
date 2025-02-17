export default function ItemPlayerIcon(props) {
    const { players, modal, team } = props;

    const boxStyle = {
        backgroundColor: modal ? '#343a40' : '#6c757d', 
        color: modal ? '#fff' : undefined, 
        padding: '20px',  
        borderRadius: modal ? '10px' : '50%', 
        width: modal ? 'auto' : '150px',  
        height: modal ? 'auto' : '150px', 
        fontSize: modal ? '18px' : 'inherit',  
        marginBottom: '30px', 
    };

    return modal ? (
        <div style={boxStyle}>
            {players.player_id}, {players.player_name}, {team}, {players.player_time}
        </div>
    ) : (
        <div style={{ display: 'flex', justifyContent: 'center', width: '50%', margin: 'auto' }}>
            <div style={boxStyle}></div>
        </div>
    );
}
