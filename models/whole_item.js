module.exports = function(sequelize, Sequelize) {
    
    var wholeItem = sequelize.define('whole_items', {

        url: {
            primaryKey: true,
            type: Sequelize.STRING,
            
        },
        author: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
        edition: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        type: {
            type: Sequelize.STRING,
        },
        category: {
            type: Sequelize.STRING,
        },
        code: {
            type: Sequelize.STRING,
        },
        numberCode: {
            type: Sequelize.STRING,
        },
        courseName: {
            type: Sequelize.STRING,
        },
    

    } , {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });

    return wholeItem;

}