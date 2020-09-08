module.exports = function(sequelize, Sequelize) {
    
        var Category = sequelize.define('category', {
    
            name: {
                type: Sequelize.STRING,
                
            },
            collegeName: {
                type: Sequelize.STRING,
            },
            code: {
                primaryKey: true,
                type: Sequelize.STRING,
            },
        
    
        } , {
            freezeTableName: true,
            timestamps: false,
            underscored: true
        });
    
        return Category;
    
    }