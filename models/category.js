module.exports = function(sequelize, Sequelize) {
    
        var Category = sequelize.define('category', {
    
            name: {
                primaryKey: true,
                type: Sequelize.STRING,
                
            },
        
    
        } , {
            freezeTableName: true,
            timestamps: false
        });
    
        return Category;
    
    }