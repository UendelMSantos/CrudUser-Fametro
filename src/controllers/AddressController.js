const db = require("../db/models/");


module.exports = {
    async index(req, res){
        const { user_id } = req.params;
    
        try {
            const user = await db.User.findByPk(user_id, {
                include: { association: 'address'}
            });
    
            if(!user){
                return res.status(404).json({
                    message: "Usuário não encontrado!"
                });
            }
    
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno do servidor."
            });
        }
    }
    ,

    async store(req, res){
        
        try{
            const { user_id } = req.params;
            const {street, number, district, city} = req.body

            const user = await db.User.findByPk(user_id);

            if(!user){
                return res.status(400).json({
                    message: "Usuário não encontrado!"
                });
            }

            const address = await db.Address.create({
                street,
                number,
                district,
                city,
                user_id,
            });

            return res.status(200).json({
                message: "Address cadastrado com sucesso!",
                address
            });

        }catch(err){
            return res.status(400).json({error: err, message: "Esta caindo aqui patrão!"});
        };

    },

    async delete(req, res){
        const id = req.params.id;

        try{
            const address = await db.Address.findByPk(id);

            if(address){
                await db.Address.destroy({where: {id}});

                return res.status(200).json({
                    message: "Deletado com Sucesso!"
                })
            } else {
                return res.status(400).json({
                    message: "Address não encontrado!"
                })
            }
        }catch(err){
            return res.status(400).json({error: err});
        }
    }

}
