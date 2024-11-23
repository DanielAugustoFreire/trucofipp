


export default function socket(io) {


  io.on('connection', (socket) => {

    socket.on("HandShake", ({ mensagem }) => { // RECEBE MENSAGEM DO FRONTEND
      console.log(mensagem);
      socket.emit("CarregarCartas");  // ENVIA MENSAGEM PARA O FRONTEND
    });

    socket.on("ValidarPessoasSala", (msg) => {
      io.to(msg.codSala).emit("asd", msg);
    })
  });

} 
