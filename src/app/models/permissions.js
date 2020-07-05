import Sequelize, {Model} from "sequelize";

class Permissions extends Model {

    static init(sequelize) {
        super.init(
    {
                name: Sequelize.STRING,
                description: Sequelize.STRING,
                type_class: Sequelize.STRING,
            },
    {
                sequelize
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Groups, {
            through: 'groups_permissions',
            as: 'permissions',
            foreignKey: 'permission_id'
        });
    }
}

export default Permissions;