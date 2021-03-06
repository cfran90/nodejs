import Sequelize from "sequelize";

import databaseConfig from '../config/database';

import Users from "../app/models/users";
import Files from "../app/models/files";
import Groups from "../app/models/groups";
import Permissions from "../app/models/permissions";

const models = [Users, Files, Permissions, Groups];

class Database {

    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))

    }
}

export default new Database();