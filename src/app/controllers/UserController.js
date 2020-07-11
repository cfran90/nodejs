import * as Yup from 'yup';

import User from "../models/users";
import Files from "../models/files";
import Groups from "../models/groups";

class UserController {

    async index(req, res) {
        const users = await User.findAll({
            include: [{
                model: Files,
                as: 'file'
            },
            {
                model: Groups,
                as: 'groups'
            }]
            // ou sem renomear: include: [File]
        });
        return res.json(users);
    }

    async findById(req, res) {
        const user = await User.findOne({
            include: [{
                model: Groups,
                as: 'groups'
            }],
            where: {id: req.params.id}
        });
        return res.json(user);
    }

    async delete(req, res) {
        console.log("USERSSSSS - DELETE")
        const user = await User.destroy({
            where: {id: req.params.id}
        }, (err) => {
            //Retornar erro quando não conseguir apagar no banco de dados
            if (err) return res.status(400).json({
                error: true,
                message: "Error: Artigo não foi apagado com sucesso!"
            });
            if (!user) {
                return res.status(400).json({error: 'User not found.'});
            }
        });
        return res.json({ok: 'Usuário deletado com sucesso.'});
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            groups: Yup.array().required()
        });
        console.log(req.body)
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Validation fails'})
        }

        // const userExists = await User.findOne({where: {email: req.body.email}});
        // if (userExists) {
        //     return res.status(400).json({error: 'E-mail já cadastrado!'});
        // }
        const {groups} = req.body;
        let list = [];
        for (let i = 0; i < groups.length; i++) {
            list.push(await Groups.findByPk(groups[i]))
        }

        const user = User.create(req.body).then((userCreated) => {
            userCreated.setGroups(list)
        });

        // user.add
        // voltar apenas alguns dados:
        // const {name, email} = User.create...
        // res.json({name, email});

        return res.json(user);
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            )
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Validation fails'})
        }

        const {email, oldPassword} = req.body;
        const user = await User.findByPk(req.userId);

        //editar somente o usuário que está logado!
        if (email !== user.email) {
            const userExists = await User.findOne({where: {email}});
            if (userExists) {
                return res.status(400).json({error: 'User already exists.'});
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({error: 'Password does not match'});
        }

        const newUser = await user.update(req.body);

        return res.json(newUser);
    }

    async updateUser(req, res) {

        const idUser = req.params.id;

        const user = await User.findByPk(idUser);
        const {email, oldPassword, groups} = req.body;
        console.log("groups")
        console.log(groups)
        const newUser = await user.update(req.body);

        return res.json(newUser);

        // const schema = Yup.object().shape({
        //     name: Yup.string(),
        //     email: Yup.string().email(),
        //     oldPassword: Yup.string().min(6),
        //     password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
        //         oldPassword ? field.required() : field
        //     ),
        //     confirmPassword: Yup.string().when('password', (password, field) =>
        //         password ? field.required().oneOf([Yup.ref('password')]) : field
        //     )
        // });
        //
        // if (!(await schema.isValid(req.body))) {
        //     return res.status(400).json({error: 'Validation fails'})
        // }

        // const {email, oldPassword} = req.body;
        // const user = await User.findByPk(req.userId);

        //editar somente o usuário que está logado!
        // if (email !== user.email) {
        //     const userExists = await User.findOne({where: {email}});
        //     if (userExists) {
        //         return res.status(400).json({error: 'User already exists.'});
        //     }
        // }

        // if (oldPassword && !(await user.checkPassword(oldPassword))) {
        //     return res.status(401).json({error: 'Password does not match'});
        // }

        // const newUser = await user.update(req.body);
        //
        // return res.json(newUser);
    }


}

export default new UserController();