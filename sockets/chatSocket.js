


export default function socket(io) {


  io.on('connection', (socket) => {
    const { nome, codSala } = socket.handshake.query;
    console.log(`User ${nome} connected to room ${codSala}`);
    
    socket.emit("teste", { message: "Bem-vindo! Cartas estão carregando..." });

      socket.on("teste", (msg) => {
        io.to(msg.codSala).emit("teste", msg);
      })
  });

}
