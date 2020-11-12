module.exports = function(sequelize, Sequelize) {
    
    var Item = sequelize.define('item', {

        itemId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        invoiceId: {
            type: Sequelize.INTEGER,
        },
        url: {
            primaryKey: true,
            type: Sequelize.STRING,
        },
    

    } , {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });

    return Item;

}