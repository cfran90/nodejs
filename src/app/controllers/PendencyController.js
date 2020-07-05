import * as Yup from "yup";
import Pendencies from "../models/pendencies";

class PendencyController {

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
        const Pendency = await Pendencies.create(data);

        if (permissions && permissions.length) {
            Pendency.setPermissions(permissions);
        }

        return res.json(Pendency);

    }
}

export default new PendencyController();