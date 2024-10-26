


export default function socket(io) {


  io.on('connection', (socket) => {

    socket.on("HandShake", ({ mensagem }) => { // RECEBE MENSAGEM DO FRONTEND
      console.log(mensagem);
      socket.emit("CarregarCartas", "Back -> Front");  // ENVIA MENSAGEM PARA O FRONTEND
    });

    socket.on("asd", (msg) => {
      io.to(msg.codSala).emit("asd", msg);
    })
  });

} 
