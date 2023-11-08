 
import { Model, DataTypes } from 'sequelize'; 
import sequelize from './config.js';
 
 

const UserModel =   sequelize.define(' users',{
	id: {
	 type:	DataTypes.INTEGER, 
	 autoIncrement: true,
	 primaryKey: true
	},
    // username: DataTypes.STRING,
    lastname: DataTypes.STRING
}, 
{
    tableName: 'users',
    paranoid:true
})

export default UserModel