import Sequelize, {Model} from "sequelize";

class Pendencies extends Model {

    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                text: Sequelize.STRING,
                status: Sequelize.STRING
            },
            {
                sequelize
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Users, {foreignKey: 'user_id', as: 'author'});
        this.belongsTo(models.Users, {foreignKey: 'user_id', as: 'editedBy'});
    }
}

export default Pendencies;