"use client";

import Link from 'next/link';

export default function Home() {

  let usuario = {
    email: "",
    id: "",
    nome: ""
  }
  
  function ValidarFront() {
    fetch("http://localhost:5000/auth/api/validarFront", {
      credentials: "include",
    })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    })
    .catch((ex) => {
      console.log(ex);
    });

  };

  return (
    <div>
      <header className="bg-dark text-white text-center p-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src="/img/cartas-icon.png" alt="Card Icon" className="me-2" style={{ width: '40px', height: '40px' }} />
          <h1>Bem-vindo ao FIPPTRUCO</h1>
        </div>
        <div>
          <Link href="/salas" type="button" className="btn btn-primary">Login</Link>
        </div>
      </header>

      <div className="container mt-5">
        <section id="sobre" className="mb-5">
          <h2>Sobre o Jogo</h2>
          <p>Truco é um tradicional jogo de cartas jogado no Brasil e em outros países da América do Sul. Ele é popular em reuniões entre amigos e em campeonatos, trazendo muita emoção e diversão. Agora, você pode jogar online contra amigos ou jogadores de todo o país!</p>
        </section>

        <section id="jogar" className="text-center">
          <h2>Pronto para Jogar?</h2>
          <button onClick={ValidarFront} className="btn btn-success btn-lg">Iniciar Jogo</button>
        </section>
      </div>

      <footer className="bg-dark text-white text-center p-3 mt-5">
        <p>© 2024 FIPPTRUCO Online - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
