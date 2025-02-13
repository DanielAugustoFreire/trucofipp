"use client";

import FormLogin from "./components/formLogin.js";
import ImgTrucoFipp from "./components/imgTrucoFipp.js";
import Footerlogin from "./components/footerLogin.js";

export default function Login() {
    const backgroundStyle = {
        backgroundImage: 'url(/img/imgLogin.jpg)', // Corrigido o caminho e a extensão
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
    };

    return (
        <div style={backgroundStyle}>
            <div
                style={{
                    color: 'white',
                    fontSize: '25px',
                    position: 'absolute',
                    bottom: '10px', // Distância do canto inferior
                    left: '10px',   // Distância do canto esquerdo
                    marginRight: '10px',
                }}
            >
                {/* Adicione o texto ou conteúdo necessário aqui */}
            </div>
            <div className="">
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <ImgTrucoFipp />
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <FormLogin />
                            </div>
                        </div>
                        <Footerlogin />
                    </div>
                </section>
            </div>
        </div>
    );
}
