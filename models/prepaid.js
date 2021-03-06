module.exports = function(sequelize, Sequelize) {
    
    var Prepaid = sequelize.define('prepaid_card', {

        pinNumber: {
            primaryKey: true,
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    

    } , {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });

    return Prepaid;

}