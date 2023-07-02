const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static initiate(sequelize) {
        Post.init({
            content: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: "Post",
            tableName: "posts",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate(db) {
        db.Post.belongsTo(db.User, {foreignKey: "commenter", sourceKey: "nick"});
    }
};

module.exports = Post;