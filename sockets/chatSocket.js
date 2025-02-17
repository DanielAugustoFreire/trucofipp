import JogoRepository from "../repositories/jogoRepository.js";
import ParticipanteEntity from "../entities/participanteEntity.js";
import SalaEntity from "../entities/salaEntity.js";
import JogoEntity from "../entities/jogoEntity.js";
import MovimetacaoEntity from "../entities/movimentacaoEntity.js";
import CartaEntity from "../entities/cartaEntity.js";


export default function socket(io) {


  io.on('connection', (socket) => {

    socket.on("ValidarPessoasSala", async (msg) => { //Valida se a pessoa participa deste jogo e caso participe, se o jogo existe
      try{
        let joroRepo = new JogoRepository();
        let result = await joroRepo.buscarJogoPorIdJogo(msg.jogo_id);
        if(result.length <= 0){
          socket.emit("Negado_Id", "Jogo Inexistente");  // ENVIA MENSAGEM PARA O FRONTEND
          return;
        }
        let participanteEntity = new ParticipanteEntity(0, 0, msg.user_id, 0);
        result = await participanteEntity.ValidarJogadorSala()
        if(!result){
          socket.emit("Negado_Id", "Voce Nao esta participando desta sala");  // ENVIA MENSAGEM PARA O FRONTEND
          return;
        }
      }
      catch(ex){
        socket.emit("Negado_Id", "Erro Interno");  // ENVIA MENSAGEM PARA O FRONTEND
      }
    })

    socket.on("CarregarCartasBack", async (msg) => { //Valida se a pessoa participa deste jogo e caso participe, se o jogo existe
      try{
        io.emit("CarregarCartas", msg);  // ENVIA MENSAGEM PARA O FRONTEND
      }
      catch(ex){
        socket.emit("Negado_Id", "Erro Interno");  // ENVIA MENSAGEM PARA O FRONTEND
      }
    })
    socket.on("Pronto", async (msg) => { //Valida se a pessoa participa deste jogo e caso participe, se o jogo existe
      try{
        io.emit("jogadoresPronto", msg);  // ENVIA MENSAGEM PARA O FRONTEND
      }
      catch(ex){
        socket.emit("Negado_Id", "Erro Interno");  // ENVIA MENSAGEM PARA O FRONTEND
      }
    })

    socket.on("SalaCarregadaEspera", async(msg) => {
      try{
        io.emit("tudoCarregadoEspera", msg);  // ENVIA MENSAGEM PARA O FRONTEND
      }
      catch(ex){
        socket.emit("Negado_Id", "Erro Interno");  // ENVIA MENSAGEM PARA O FRONTEND
      }
    })

    socket.on("movimento", async (msg) =>{
      try{
        let movimentacao = new MovimetacaoEntity();
        let result = await movimentacao.consultarMovimentos(msg.par_id);
        let carta = new CartaEntity();
        let resultCarta = await carta.obterCartaPorIdJogo(msg.jogo_id);
        let enviar = {
          movimentacao: result,
          cartas: resultCarta,
          mao_id: resultCarta.mao_id
        }
          io.emit("movimentoFront", enviar);  // ENVIA MENSAGEM PARA O FRONTEND
      }
      catch(ex){
        socket.emit("Negado_Id", "Erro Interno");  // ENVIA MENSAGEM PARA O FRONTEND
      }
    })

    socket.on("CarregarSalas", async (msg) => {
      try {
          let salaEntidade = new SalaEntity(0);
          let result = await salaEntidade.listarSalas();
  
          let salassss = [];
    
          result.forEach((sala) => {
              let salaData = {
                  sala_id: sala.sala_id,
                  sala_name: sala.sala_name,
                  equipes: []
              };

              salaData.equipes.push({
                  equipe_id_1: sala.equipes[0]?.equipe_id_1,
                  equipe_name_1: sala.equipes[0]?.equipe_name_1,
                  equipe_id_2: sala.equipes[0]?.equipe_id_2,
                  equipe_name_2: sala.equipes[0]?.equipe_name_2,
                  players: []
              });

              if (Array.isArray(sala.equipes[0]?.players)) {
                  sala.equipes[0].players.forEach((player) => {
                      if (!player.playet_saida) {
                          salaData.equipes[0].players.push({
                              player_id: player.player_id,
                              player_name: player.player_name,
                              player_time: player.player_time,
                              playet_saida: player.playet_saida
                          });
                      }
                  });
              }

              salassss.push(salaData);
          });
  
          io.emit("SalasCarregadas", salassss);
      } catch (ex) {
          socket.emit("AcessoNegado", "Erro Interno: Não foi possível carregar as salas.");
      }
  });
  

    socket.on("CarregarSalasEspera", () => {
      try {
        io.emit("SalaCarregadaEspera", { mensagem: "Teste" });
      } catch (ex) {
        socket.emit("AcessoNegado", "Erro Interno: Não foi possível carregar as salas.");
      }
    });
    

    socket.on("TemQuatroJogadores", async (msg) => {  
      try{
        let salaEntidade = new SalaEntity(msg.sala_id);
        let result = await salaEntidade.ValidarQuatroJogadores();
        if(result){
          socket.emit("TemQuatro", "Iniciando Jogo...");  // ENVIA MENSAGEM PARA O FRONTEND
        }else{
          socket.emit("NaoTemQuatro", "CaiuNoFalse");  // ENVIA MENSAGEM PARA O FRONTEND
        }
      }
      catch(ex){
        socket.emit("AcessoNegado", "Erro Interno");  // ENVIA MENSAGEM PARA O FRONTEND
      }
    })

    socket.on("RedirecionarParaJogo", async (msg) => { //Espera para essa funcao ser chamada, o front deve obrigatoriamente ter criado o jogo
      try{
        let salaEntidade = new SalaEntity(msg.sala_id);
        let result = await salaEntidade.ValidarQuatroJogadores();
        if(result){
          socket.emit("TemQuatroJogadores", "Iniciando Jogo...");  // ENVIA MENSAGEM PARA O FRONTEND
        }else{
          socket.emit("NaoTemQuatroJogadores", "CaiuNoFalse");  // ENVIA MENSAGEM PARA O FRONTEND
        }
      }
      catch(ex){
        socket.emit("AcessoNegado", "Erro Interno");  // ENVIA MENSAGEM PARA O FRONTEND
      }
    })

    socket.on("IniciarJogo", async (msg) => {  //Basicamente o fetch das salas para quando alguem entrar ele atualizar no io.to
      try{
        let sala_id = msg.sala_id;
        let jogo_id = msg.jogo_id;
        let result = {
          sala_id: sala_id,
          jogo_id: jogo_id
        }
        io.emit("InicioJogoFront", result);  // ENVIA MENSAGEM PARA O FRONTEND
      }
      catch(ex){
        socket.emit("AcessoNegado", "Erro Interno");  // ENVIA MENSAGEM PARA O FRONTEND
      }
    })
    
  });

} 
