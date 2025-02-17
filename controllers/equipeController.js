import EquipeEntity from "../entities/equipeEntity.js"


export default class EquipeController{

    async ListarEquipes(req,res){
        try{
            let id_sala = req.params.idSala;
            let equipeEntidade = new EquipeEntity();
            let equipes = await equipeEntidade.ListarEquipesPeloIdSala(id_sala);
            if(equipes){
                res.status(200).json(equipes);
            }
            else{
                throw new Error("Erro ao listar equipes");
            }
        }catch(ex){
            res.status(500).json({msg: "Erro ao listar equipes"});    
        }
    }

    async ListarEquipesExclusivamente(req,res){
        try{
            let id_sala = req.params.idSala;
            let equipeEntidade = new EquipeEntity();
            let equipes = await equipeEntidade.ListarEquipesExclusivamentePeloIdSala(id_sala);
            if(equipes){
                res.status(200).json(equipes);
            }
            else{
                throw new Error("Erro ao listar equipes");
            }
        }catch(ex){
            res.status(500).json({msg: "Erro ao listar equipes"});    
        }
    }

}