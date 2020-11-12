module.exports = function(sequelize, Sequelize) {
    
    var Invoice = sequelize.define('invoice', {

        invoiceId: {
            primaryKey: true,
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.DATE,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        totalPrice:{
            type: Sequelize.INTEGER,
        }
    

    } , {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });

    return Invoice;

}