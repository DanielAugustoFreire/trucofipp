"use client";

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import UserContext from './context/userContext';
import LoadingSpinner from './components/LoadingSpinner';

export default function Home() {
  const {user} = useContext(UserContext);
  const [logado,setLogado] = useState(false);

  useEffect(() => {
    if(user){
      setLogado(true)
    }
  }, [])

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#f4f4f4' }}>
      {/* Header */}
      <header className="text-white text-center p-4 d-flex justify-content-between align-items-center shadow-lg" style={{ backgroundColor: '#006400', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
        <div className="d-flex align-items-center">
          <img src="/img/cartas-icon.png" alt="Card Icon" className="me-2" style={{ width: '50px', height: '50px' }} />
          <h1 className="fw-bold" style={{ fontSize: '2.2rem'  }}>FIPPTRUCO</h1>
        </div>
        <div>
          {
          logado ? 
            <h4>{user.nome}</h4>
          : 
            <Link href="/login" className="btn btn-light shadow-sm" style={{ padding: '12px 24px', borderRadius: '30px', fontWeight: '600', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s' }}>
            Login
            </Link>
        }
        </div>
      </header>

      {/* Main Content */}
      <div className="container mt-5" style={{ maxWidth: '900px' }}>
        {/* About Section */}
        <section id="sobre" className="mb-5">
          <h2 style={{ color: 'grey', fontSize: '2.2rem', fontWeight: '600' }}></h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden', transition: 'transform 0.3s' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '1.25rem', fontWeight: '600', color: "black" }}>O que é o Truco?</h5>
                  <p className="card-text" style={{ fontSize: '1.1rem', color: '#555' }}>
                    Truco é um tradicional jogo de cartas jogado no Brasil e em outros países da América do Sul, popular entre amigos e campeonatos.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden', transition: 'transform 0.3s' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '1.25rem', fontWeight: '600', color:"black" }}>Jogue Online</h5>
                  <p className="card-text" style={{ fontSize: '1.1rem', color: '#555' }}>
                    Agora, você pode jogar online contra amigos ou jogadores de todo o país, sempre com a emoção de uma partida de Truco.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Card: Jogo Gratuito */}
        <section className="text-center mb-5">
          <div className="card shadow-lg" style={{ backgroundColor: '', borderRadius: '15px', overflow: 'hidden', transition: 'transform 0.3s' }}>
            <div className="card-body">
              <h3 className="card-title" style={{ fontSize: '2rem', fontWeight: '700', color: 'black' }}>Jogo 100% Gratuito!</h3>
              <p className="card-text" style={{ fontSize: '1.2rem', color: '#555' }}>
                Aproveite a diversão sem custos! FIPPTRUCO é totalmente gratuito, sem taxas ou cobranças. Jogue o tempo que quiser com seus amigos e mostre suas habilidades!
              </p>
              <i className="bi bi-gift" style={{ fontSize: '3rem', color: '#555' }}></i>
            </div>
          </div>
        </section>

        {/* Play Section */}
        <section id="jogar" className="text-center mb-5">
          <h2 style={{ color: 'grey', fontSize: '2.2rem', fontWeight: '600' }}>Pronto para Jogar?</h2>
          <a href="/salas" className="btn btn-success btn-lg" style={{ backgroundColor: '#006400', borderRadius: '50px', padding: '15px 30px', fontSize: '1.2rem', transition: '0.3s ease-in-out', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', display: 'inline-block' }}>
            Iniciar Jogo
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-white text-center p-3 mt-5" style={{ backgroundColor: '#006400', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
        <p style={{ fontSize: '1rem' }}>TRUCOFIPP  Copyright © 2024. All rights reserved.</p>
      </footer>

      {/* Animations on Hover */}
      <style jsx>{`
        .card:hover {
          transform: scale(1.05);
        }

        .btn:hover {
          background-color: #218838;
          transform: scale(1.1);
        }

        .btn:active {
          transform: scale(1);
        }
      `}</style>
    </div>
  );
}
