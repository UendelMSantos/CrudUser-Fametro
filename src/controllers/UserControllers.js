const db = require('../db/models/');
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');
const authConfig = require('../auth/auth.json')

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 78300,
    })
}

module.exports = {

    //Login
    async login(req, res){
        const { password, email, isLogged } = req.body;

        const user = await db.User.findOne({ where: {email} });

        if(!user){
            return res.status(400).json({
                message: 'Email ou senha incorretos!'
            });
        }

        if(!bcrypt.compareSync(password, user.password)){
            return res.status(400).json({
                message: "Senha ou Email Incorretos!"
            })

        }

        const user_id = user.id;

        await db.User.update({
            isLogged
        },{
            where: {
                id: user_id
            }
        });
        user.password = undefined

        const token = generateToken({ id: user.id });

        return res.status(200).json({
            message: "Usuário logado com sucesso!",
            user, 
            token
        });

    },



    //Buscar
    async index(req, res){
        
        const users = await db.User.findAll();

        if(users == "" || users == null){
            return res.status(200).send({ message: "Nenhum usuário cadastrado" });
        }

        return res.status(200).json({users});

    },

    //Salvar
    async store(req, res){

        const {name, email, password} = req.body;

        const user = await db.User.create({name, email, password});

        const token = generateToken({ id: user.id});

        return res.status(200).json({
            user,
            token
        });

    },
    
    //Atualizar
    async update(req, res){
        //Recebo os dados por body(corpo);
        const {name, email, password} = req.body;
        //Recebo os dados por parametros passados pela URL
        const {user_id} = req.params;
        /*Aqui acioso a função update e utilizo o "where(onde) 
        para ilustrar onde eu quero que seja a atualização, que no caso
        é onde eu recebo o "user_id" por parâmetro;
        */
        const userUpdated = await db.User.update({
                name, email, password
            },{
                where: {
                    id: user_id
                }
            });
            return res.status(200).json({
                "status": 1,
                "message": "Usuário atualizado com sucesso!",
            });
    },

    //Deletar
    async delete(req, res){

        //Recebo os dados por parametros passados pela URL
        const { user_id } = req.params;

        await db.User.destroy({
            where: {
                id: user_id
            }
        })
        return res.status(200).json({
            status: 1,
            message: "Usuário foi deletado com sucesso!",
        });

    }

};