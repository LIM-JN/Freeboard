const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static initiate(sequelize) {
        Comment.init({
            content: {
                type: Sequelize.STRING(240),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: "Comment",
            tableName: "comments",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate(db) {
        db.Comment.belongsTo(db.User, {foreignKey: "username", targetKey: "nick"});
        db.Comment.belongsTo(db.Post, {foreignKey: "postId", targetKey: "id"});
    }
}

module.exports = Comment;