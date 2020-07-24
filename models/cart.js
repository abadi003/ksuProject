module.exports = function(sequelize, Sequelize) {
    
    var Cart = sequelize.define('cart', {

        url: {
            primaryKey: true,
            type: Sequelize.STRING,
            
        },
        userId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
        },

    } , {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    });

    return Cart;

}