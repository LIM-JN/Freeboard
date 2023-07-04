const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            indexes: [
                {
                    unique: true,
                    fields: ['nick'],
                    name: 'idx_users_nick'
                }
            ]
        });
    }
    static associate(db) {
        db.User.hasMany(db.Post,{foreignKey: "username", sourceKey: "nick"});
    }
};

module.exports = User;