import SalaEntity from '../entities/salaEntity.js';
import Database from '../db/database.js';
import EquipeEntity from '../entities/equipeEntity.js';
import ParticipanteEntity from '../entities/participanteEntity.js';

export default class salaController{

    async inserirParticipante(req,res){
        let banco = Database.getInstance();
        await banco.AbreTransacao();
        try{
            let {usuario_id, sala_id, equipe_id} = req.body;
            let usuario = new ParticipanteEntity();
            let resultado = await usuario.inserirParticipante(usuario_id, sala_id, equipe_id, banco);
            if(resultado){
                let sala = new SalaEntity();
                let numeroJogadores = await sala.obterNumeroJogadoresPartidasValidas(sala_id, banco);
                if(numeroJogadores){
                    await banco.Commit();
                    res.status(201).json({msg: "Participante inserido com sucesso", num_jog: numeroJogadores});    
                }
            }else{
                throw new Error("Erro ao inserir participante");
            }
        }catch(ex){
            await banco.Rollback();
            res.status(500).json({msg: "Erro ao inserir participante"});
        }
    }

    async listarSalas(req,res){
        try{
            let salaEntidade =  new SalaEntity();
            let salas = await salaEntidade.listarSalas();
            if(salas){
                res.status(200).json(salas);
            }
            else{
                throw new Error("Erro ao listar salas");
            }
        }catch(ex){
            res.status(500).json({msg: "Erro ao listar salas"});
        }
    }

    async ListarPlayersSalas(req,res){
        try{
            let {id_sala} = req.params;
            let salaEntidade = new SalaEntity();
            let resultado = await salaEntidade.ListarPlayersSalas(id_sala);
            if(resultado){
                res.status(200).json(resultado);
            }else{
                res.status(400).json({msg: "Erro ao listar players da sala"});
            }
        }catch(ex){
            res.status(500).json({msg: "Erro ao listar players da sala"});
        }
    }

    async criarSala(req,res){
        let banco = Database.getInstance();
        await banco.AbreTransacao();
        try{
            let {nome, usuario_id, equipe1, equipe2} = req.body;
            if(nome && usuario_id && equipe1 && equipe2){
                let salaEntidade =  new SalaEntity()
                let criarEquipes = new EquipeEntity();
                
                let salaExiste = await salaEntidade.obterPorNome(nome, banco);
                if(salaExiste){
                    await banco.Rollback();
                    res.status(400).json({msg: "Sala já existe"});
                    return;
                }
                let usuario = new ParticipanteEntity();
                let usuarioSemEquipe = await usuario.ValidarJogadorNaoTemSala(usuario_id, banco);
                let equipesCriadas = await criarEquipes.criarEquipe(equipe1, equipe2, banco);
                let criarSala = await salaEntidade.criarSala(nome, usuario_id, equipesCriadas, banco);
                let equipe_criador = equipesCriadas[0];
                let inserirParticipante = await usuario.inserirParticipante(usuario_id, criarSala, equipe_criador, banco);
                if(criarSala && equipesCriadas.length > 1 && usuarioSemEquipe && inserirParticipante){
                    await banco.Commit();
                    res.status(201).json({msg: "Sala criada com sucesso"});
                    return;
                }
                else{
                    throw new Error("Sala nao foi criada por algum motivo");
                }

            }else{
                await banco.Rollback();
                res.status(400).json({msg: "Dados inválidos"});
                return;
            }
        }
        catch(ex){
            await banco.Rollback();
            res.status(500).json({msg: "Erro ao criar sala"});
        }
    }

}