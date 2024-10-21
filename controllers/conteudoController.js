
export default class ConteudoController{

    async listar(req, res){
        try{
            let conteudo = new ConteudoModel();
            let lista = await conteudo.listar();
            if(lista)
                res.status(200).json(lista);
            else
                res.status(400).json({msg: "Nenum Conteudo Encontrado"})
        }catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }

    async gravar(req,res){
        try{
            let {  conteudoId, titulo, disponivel, categoria  } = req.body;
            if(conteudoId && titulo && disponivel && categoria){
                let Conteudo = new ConteudoModel(0, conteudoId, titulo, disponivel, categoria)
                let result = await Conteudo.gravar();

                if(result){
                    res.status(201).json({msg: "Conteudo Adicionado"})
                }else{
                    throw new Error("Erro ao inserir no BD")
                }
            }else{
                res.status(400).json({msg: ex.message});
            }
        }
        catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }

    async alterar(req,res){ 
        try{
            let { id ,conteudoId, titulo, disponivel, categoria  } = req.body;
            if(id && conteudoId && titulo && disponivel && categoria){
                let Conteudo = new ConteudoModel(id, conteudoId, titulo, disponivel, categoria);
                let result = await Conteudo.alterar();

                if(result)
                    res.status(200).json({msg: "Sucesso ao alterar"})
                else
                    throw new Error("Erro ao alterar no BD")
            }
            else{
                res.status(400).json({msg: ex.message});
            }
        }catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }

    async excluir(req,res){
        try{
            let { id }= req.params;
            let conteudo = new ConteudoModel();
            let result = await conteudo.excluir(id);
            if(result)
                res.status(200).json(result)
            else
                res.status(404).json({msg: "Nao encontrado."})
        }catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }

    async obter(req,res){
        try{
            let { id } = req.params;
            let conteudo = new ConteudoModel();
            let result = await conteudo.obter(id);
            if(result)
                res.status(200).json(result)
            else
                res.status(404).json({msg: "Nao encontrado."})
        }catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }

    async assistir(req,res){
        try{
            let { id } = req.params;
            let conteudo = new ConteudoModel();
            let result = await conteudo.obter(id);
            if(result){
                res.setHeader('Content-Type', 'text/html')
                res.send(`<iframe width="560" height="315" allow='autoplay' src="https://www.youtube.com/embed/${result.conteudoId}?autoplay=1"</iframe>`)
            }
            else
                res.status(404).json({msg: "Nao encontrado."})
        }catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }

    async verCapa(req,res){
        try{
            let { id } = req.params;
            let conteudo = new ConteudoModel();
            let result = await conteudo.obter(id);
            if(result){
                res.setHeader('Content-Type', 'text/html')
                res.send(`<img src="https://i.ytimg.com/vi/${result.conteudoId}/hqdefault.jpg"/>`)
            }
            else
                res.status(404).json({msg: "Nao encontrado."})
        }catch(ex){
            res.status(500).json({msg: ex.message});
        }   
    }
}


