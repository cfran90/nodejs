import * as Yup from "yup";
import Group from "../models/groups";
import Permissions from "../models/permissions";
import Groups from "../models/groups";

class GroupController {

    async index(req, res) {
        const users = await Group.findAll({
            include: [{
                model: Permissions,
                as: 'permissions'
            }]
        });
        return res.json(users);
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
        const group = await Group.create(data);

        if (permissions && permissions.length) {
            group.setPermissions(permissions);
        }

        return res.json(group);

    }
}

export default new GroupController();