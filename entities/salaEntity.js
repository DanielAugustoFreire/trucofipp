import Database from "../db/database.js"
import salaRepositories from "../repositories/salaRepositories.js"
import BaseEntity from "./baseEntity.js"


export default class SalaEntity extends BaseEntity{
    #id
    #nome
    #usuario_id

    get id(){ return this.#id }
    set id(id){ this.#id = id }

    get nome(){ return this.#nome }
    set nome(nome){ this.#nome = nome }

    get usuario_id(){ return this.#usuario_id }
    set usuario_id(usuario_id){ this.#usuario_id = usuario_id }

    constructor(id, nome, usuario_id){
        super();
        this.#id = id;
        this.#nome = nome;
        this.#usuario_id = usuario_id;
    }

    async obterNumeroJogadoresPartidasValidas(sala_id, banco){
        let sala = {
            id: sala_id
        }
        let salaRepositori = new salaRepositories(banco);
        let result = await salaRepositori.obterNumeroJogadoresPartidasValidas(sala);
        return result;
    }

    async ListarPlayersSalas(id_sala){
        let salaRepositori = new salaRepositories();
        let result = await salaRepositori.ListarPlayersSalasPeloIdSala(id_sala);
        let result_tratado = this.TratarListaPlayersSalas(result);
        return result_tratado;
    }

    TratarListaPlayersSalas(result) {

        let equipe_1 = result[0].eqp_nome_1;
        let equipe_2 = result[0].eqp_nome_2;
        let equipe_1_id = result[0].eqp_id_1;
        let equipe_2_id = result[0].eqp_id_2;
        let sala_id = result[0].sal_id;

        let retorno = {
            equipe_1 : equipe_1,
            equipe_2 : equipe_2,
            equipe_1_id : equipe_1_id,
            equipe_2_id : equipe_2_id,
            sala_id : sala_id,
            players: []
        }

        let players = []

        for (let i = 0; i < result.length; i++) {
            players.push({
                player_id: result[i].player_id,
                player_name: result[i].player_name,
                player_time: result[i].player_time
            });
        }

        retorno.players = players;

        return retorno;

    }

    async listarSalas(){
        let salaRepositori = new salaRepositories();
        let salas = await salaRepositori.listarSalas();

        let salas_tratadas = await this.TratarListaSalas(salas);

        return salas_tratadas;
    }

    async TratarListaSalas(result) {
        let retorno = [];
        let currentSala = null;

    
        for (let i = 0; i < result.length; i++) {
            if (!currentSala || currentSala.sala_id !== result[i].sala_id) {
                if (currentSala) {
                    retorno.push(currentSala);
                }
    
                currentSala = {
                    sala_id: result[i].sala_id,
                    sala_name: result[i].sala_name,
                    equipes: [] // Lista de equipes associadas à sala
                };
            }

            let iquipi
    
            await fetch(`http://localhost:5000/equipe/Exclusivamente/${result[i].sala_id}`)
            .then(response => response.json())
            .then(data => {
                iquipi = data;
            })

            // Criar ou garantir que as equipes existam
            let equipe = currentSala.   equipes[0];
            if (!equipe) {
                equipe = {
                    equipe_id_1: iquipi[0].eqp_id,
                    equipe_name_1: iquipi[0].eqp_name,
                    equipe_id_2: iquipi[1].eqp_id,
                    equipe_name_2: iquipi[1].eqp_name,
                    players: [] // Lista de jogadores
                };
                currentSala.equipes.push(equipe);
            }
    
            // Adicionar jogadores apenas se eles existirem no item atual
            if (result[i].player_id) {
                equipe.players.push({
                    player_id: result[i].player_id,
                    player_name: result[i].player_name,
                    player_time: result[i].player_time,
                    playet_saida: result[i].saida
                });
            }
        }
    
        if (currentSala) {
            retorno.push(currentSala);
        }
    
        return retorno;
    }
    
    
    async ValidarQuatroJogadores(){
        let banco = Database.getInstance();
        let salaRepositori = new salaRepositories(banco);
        let result = await salaRepositori.ValidarQuatroJogadores(this.#id);
        return result;
;    }
    
    async obterPorNome(nome, banco){
        let salaRepositori = new salaRepositories(banco);
        let sala = await salaRepositori.obterPorNome(nome);
        return sala;
    }
    
    async criarSala(nome, usuario_id, equipes_ids,banco){
        let salaRepositori = new salaRepositories(banco);
        let result = await salaRepositori.criarSala(nome, usuario_id, equipes_ids[0], equipes_ids[1]);
        return result;
    }

}