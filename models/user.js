module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('user', {

        user_id: {
            primaryKey: true,
            type: Sequelize.INTEGER
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

        DOB: {
            type: Sequelize.date
        },

        level: {
            type: Sequelize.INTEGER
        },

        balance: {
            type: Sequelize.INTEGER
        },

    });

    return User;

}