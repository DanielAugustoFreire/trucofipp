


export default function socket(io) {


  io.on('connection', (socket) => {

    socket.on("ValidarPessoasSala", (msg) => {
      if(msg.id == 1 ){
        socket.emit("CarregarCartas", "Carregar Cartas");  // ENVIA MENSAGEM PARA O FRONTEND
      }else{
        socket.emit("Negado", "Acesso Negado");  // ENVIA MENSAGEM PARA O FRONTEND
      }
    })
  });

} 
