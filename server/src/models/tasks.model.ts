import { db } from '@/databases';
import { Task } from '@interfaces/tasks.interface';
import { DataTypes, Model } from 'sequelize';

class TaskModel extends Model<Task, Task> {
  public declare id: string;
  public declare position: number;
  public declare content: string;
  public declare userId: string | null;
  public declare columnId: string | null;
}

TaskModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: DataTypes.STRING,
    columnId: DataTypes.STRING,
  },
  {
    tableName: 'tasks',
    sequelize: db,
  },
);

TaskModel.sync();

export default TaskModel;
