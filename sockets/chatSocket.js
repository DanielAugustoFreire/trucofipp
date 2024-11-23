import JogoRepository from "../repositories/jogoRepository.js";


export default function socket(io) {


  io.on('connection', (socket) => {

    socket.on("ValidarPessoasSala", async (msg) => {
      try{
        let joroRepo = new JogoRepository();
        let result = await joroRepo.buscarJogoPorIdJogo(msg.id);
        if(result.length > 0){
          socket.emit("CarregarCartas", "Carregar Cartas");  // ENVIA MENSAGEM PARA O FRONTEND
        }else{
          socket.emit("Negado", "Acesso Negado");  // ENVIA MENSAGEM PARA O FRONTEND
        }
      }
      catch(ex){
        socket.emit("Negado", "Erro Interno");  // ENVIA MENSAGEM PARA O FRONTEND
      }
    })
  });

} 
