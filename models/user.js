module.exports = function(sequelize, Sequelize) {
var passportLocalSequelize = require('passport-local-sequelize');

    var User = sequelize.define('user', {

        userId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            underscored: true
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        dateOfBirth: {
            type: Sequelize.DATE,
            underscored: false

        },

        level: {
            type: Sequelize.INTEGER
        },

        balance: {
            type: Sequelize.INTEGER
        },
        password:{
            type: Sequelize.STRING
        },
        isAdmin:{
            type: Sequelize.INTEGER
        }

    },{ underscored: true,
        timestamps: false} );

    passportLocalSequelize.attachToUser(User, {
        usernameField: 'email'
    });
    return User;

}