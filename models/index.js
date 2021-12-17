const User = require("./User");
const Post = require("./Post");
const Vote = require('./Vote');

// create associations
// creates the reference for the id column in the User model to link to the corresponding foreign key pair, which is user_id in the Post model
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// creates the reverse association: the reference for the id column in the Post model to link to the corresponding foreign key pair which is user_id in the User model; the constraint is that the Post belongs to one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// through the Vote model, this creates a reference in the id column of the User model to link to the corresponding foreign key pair, which is the user_id in the Post model; the Vote model should be displayed as "voted_posts" so as to be a little more informative
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

// creates the reverse association: through the Vote model, this creates a reference in the id column of the Post model to link to the corresponding foreign key pair, which is the user_id in the User model; the Vote model should be displayed as "voted_posts" so as to be a little more informative
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// creates the reference for the id column in the Vote model to link to the corresponding foreign key pair, which is user_id in the User model
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

// creates the reference for the id column in the Vote model to link to the corresponding foreign key pair, which is user_id in the Post model
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

// creates the reference for the id column in the User model to link to the corresponding foreign key pair, which is user_id in the Vote model
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// creates the reference for the id column in the Post model to link to the corresponding foreign key pair, which is user_id in the Vote model
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote };