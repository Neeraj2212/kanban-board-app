import UserModel from './users.model';
import ColumnModel from './columns.model';
import TaskModel from './tasks.model';

export const setupAssociations = () => {
  UserModel.hasMany(ColumnModel, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'columns',
  });

  UserModel.hasMany(TaskModel, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'tasks',
  });

  ColumnModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user',
  });

  ColumnModel.hasMany(TaskModel, {
    sourceKey: 'id',
    foreignKey: 'columnId',
    as: 'tasks',
    onDelete: 'CASCADE',
  });

  TaskModel.belongsTo(ColumnModel, {
    foreignKey: 'columnId',
    as: 'column',
  });

  TaskModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user',
  });
};
