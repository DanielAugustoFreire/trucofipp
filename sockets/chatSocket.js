import JogoRepository from "../repositories/jogoRepository.js";
import ParticipanteRepository from "../repositories/participanteRepositorie.js";
import Database from "../db/database.js";
import ParticipanteEntity from "../entities/participanteEntity.js";

export default function socket(io) {


  io.on('connection', (socket) => {

    socket.on("ValidarPessoasSala", async (msg) => {
      let banco = new Database();
      try{
        let joroRepo = new JogoRepository(banco);
        let result = await joroRepo.buscarJogoPorIdJogo(msg.id_sala);
        let participanteEntity = new ParticipanteEntity(null, null, msg.id_usuario, msg.id_sala, msg.id_equipe);
        let participanteRepo = new ParticipanteRepository(banco);
        let result2 = await participanteRepo.verificarParticipantePartidaPeloIdSala(participanteEntity);
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
