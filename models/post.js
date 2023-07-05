const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static initiate(sequelize) {
        Post.init({
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            }
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
        db.Post.belongsTo(db.User, {foreignKey: "username", targetKey: "nick"});
        db.User.hasMany(db.Comment,{foreignKey: "PostId", sourceKey: "id"});
    }
};

module.exports = Post;