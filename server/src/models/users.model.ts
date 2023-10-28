import { db } from '@/databases';
import { User } from '@interfaces/users.interface';
import { DataTypes, Model } from 'sequelize';
import ColumnModel from './columns.model';

class UserModel extends Model<User, User> {
  public declare id: string;
  public declare username: string;
  public declare password: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: DataTypes.STRING,
  },
  {
    tableName: 'users',
    sequelize: db,
  },
);

UserModel.sync();

export default UserModel;
