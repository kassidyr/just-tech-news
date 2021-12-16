const User = require("./User");
const Post = require("./Post");

// create associations
// creates the reference for the id column in the User model to link to the corresponding foreign key pair, which is user_id in the Post model
User.hasMany(Post, {
    foreignKey: 'user_id'
});
// creates the reverse association: the reference for the id column in the Post model to link to the corresponding foreign key pair which is user_id in the User model; the constraint is that the Post belongs to one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };