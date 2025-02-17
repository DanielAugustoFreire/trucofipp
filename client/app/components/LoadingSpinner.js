import React from 'react';

export default function LoadingSpinner({ tamanho , tamanho_imagem}) {

    let tamanho_img = tamanho_imagem ? tamanho_imagem : 200;
    let tamanho_ret = tamanho ? tamanho : 10;
    
    return (
        
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "75vh",
                width: "100vw",
            }}
        >
            <div
                className="spinner-border text-"
                role="status"
                style={{ width: `${tamanho_ret}rem`, height: `${tamanho_ret}rem` }}
            >
                <span>
                    <img src="/img/cartas-icon.png" width={`${tamanho_img}px`} alt="icon" />
                </span>
            </div>
        </div>
    );
}
