module.exports = function(sequelize, Sequelize) {
    
        var RootCategory = sequelize.define('root_category', {
    
            name: {
                primaryKey: true,
                type: Sequelize.STRING,
                
            },
        
    
        } , {
            freezeTableName: true,
            timestamps: false
        });
    
        return RootCategory;
    
    }