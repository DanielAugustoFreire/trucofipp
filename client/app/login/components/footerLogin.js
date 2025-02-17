export default function Footerlogin() {
    const footerStyle = {
        position: 'fixed', // Fixar na parte inferior
        bottom: 0,
        left: 0,
        width: '100%', // Cobre toda a largura
        
        color: 'white', // Texto branco
        textAlign: 'center',
        padding: '10px 20px', // Espaçamento interno
    };

    return (
        <div style={footerStyle}>
            TRUCOFIPP          Copyright © 2024. All rights reserved.
        </div>
    );
}