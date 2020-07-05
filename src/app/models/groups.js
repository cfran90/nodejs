import Sequelize, {Model} from "sequelize";

class Groups extends Model {

    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                description: Sequelize.STRING
            },
    {
                sequelize
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Permissions, {
            through: 'groups_permissions',
            as: 'permissions',
            foreignKey: 'group_id'
        });
        this.belongsToMany(models.Users, {
            through: 'users_groups',
            as: 'users',
            foreignKey: 'group_id'
        });
    }
}

export default Groups;