import { db } from '@/databases';
import { Column } from '@interfaces/columns.interface';
import { DataTypes, Model } from 'sequelize';

class ColumnModel extends Model<Column, Column> {
  public declare id: string;
  public declare title: string;
  public declare userId: string | null;
}

ColumnModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: DataTypes.STRING,
  },
  {
    tableName: 'columns',
    sequelize: db,
  },
);

ColumnModel.sync();

export default ColumnModel;
