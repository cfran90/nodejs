import * as Yup from 'yup';
import Permission from "../models/permissions";

class PermissionController {

    async store(req, res) {

        const schema  = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string(),
            type_class: Yup.string().required()
        });

        if (!await schema.isValid(req.body)) {
            return res.status(400).json({error: "Validation fails"});
        }

        const isPermissionExists = await Permission.findOne({
            where: {name: req.body.name}
        });

        if (isPermissionExists) {
            return res.status(400).json({error: "Permissão com esse nome já existe."});
        }

        const permission = Permission.create(req.body);

        return res.json(permission);

    }

    async index(req, res) {
        console.log("PERMISSIONS - FINDALL")
        const permission = await Permission.findAll();
        return res.json(permission);
    }

    async findById(req, res) {
        const user = await Permission.findOne({
            where: {id: req.params.id}
        });
        return res.json(user);
    }
}

export default new PermissionController();