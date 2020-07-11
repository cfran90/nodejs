import * as Yup from "yup";
import Permissions from "../models/permissions";
import Groups from "../models/groups";
import User from "../models/users";

class GroupController {

    async index(req, res) {
        const groups = await Groups.findAll({
            include: [{
                model: Permissions,
                as: 'permissions'
            }]
        });
        return res.json(groups);
    }

    async findById(req, res) {
        const group = await Groups.findOne({
            include: [{
                model: Permissions,
                as: 'permissions'
            }],
            where: {id: req.params.id}
        });
        return res.json(group);
    }

    async store(req, res) {

        const schema  = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string()
        });

        // if (!await schema.isValid(req.body)) {
        //     return res.status(400).json({error: "Validation fails"});
        // }

        // const isPermissionExists = await Permission.findOne({
        //     where: {name: req.body.name}
        // });

        const {permissions, ...data} = req.body;
        const group = await Groups.create(data);

        if (permissions && permissions.length) {
            group.setPermissions(permissions);
        }

        return res.json(group);

    }

    async saveGroupPermission(req, res) {
        const group = await Groups.findOne({
            include: [{
                model: Permissions,
                as: 'permissions'
            }],
            where: {id: req.params.id}
        });

        const {permission} = req.body;

        group.addPermissions(permission);

        return res.json(group);
    }

    async removeGroupPermission(req, res) {
        const group = await Groups.findOne({
            include: [{
                model: Permissions,
                as: 'permissions'
            }],
            where: {id: req.params.id}
        });

        const {permission} = req.body;

        group.removePermissions(permission);

        return res.json(group);
    }
}

export default new GroupController();