import Sequelize, {Model} from "sequelize";

import bcrypt from 'bcryptjs';

class Users extends Model {
    static init(sequelize) {
        super.init(
    {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING
            },
    {
                sequelize
            }
        );

        this.addHook('beforeSave', async user => {
            // save/edit
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Files, {foreignKey: 'file_id', as: 'file'});
        this.belongsToMany(models.Groups, {
            through: 'users_groups',
            as: 'groups',
            foreignKey: 'user_id'
        });
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default Users;