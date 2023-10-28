import { HttpException } from '@/exceptions/HttpException';
import TaskModel from '@/models/tasks.model';
import { Op } from 'sequelize';

export class TaskService {
  public tasks = TaskModel;

  public async findAllTasksOfUser(userId: string) {
    const findTasks = await this.tasks.findAll({ where: { userId: userId }, order: [['createdAt', 'ASC']] });
    return findTasks;
  }

  public async createTask(userId: string, taskData: any) {
    const createTaskData = await this.tasks.create({ ...taskData, userId });
    return createTaskData;
  }

  public async updateTask(taskId: string, userId: string, taskData: any) {
    const findTask = await this.tasks.findOne({ where: { id: taskId, userId: userId } });
    if (!findTask) throw new HttpException(404, `This task ${taskId} was not found`);

    const updateTaskData = await this.tasks.update({ ...taskData }, { where: { id: taskId } });
    return updateTaskData;
  }

  public async updateTaskPosition(taskId: string, taskPositionData: any) {
    const { sourceColumnId, destinationColumnId, sourcePosition, destinationPosition } = taskPositionData;

    const findTask = await this.tasks.findOne({ where: { columnId: sourceColumnId, position: sourcePosition, id: taskId } });
    if (!findTask) throw new HttpException(404, `This task ${taskId} was not found`);

    // Check if task moved in same column and update positions of other tasks of same column
    if (sourceColumnId === destinationColumnId) {
      // If task moved up
      if (sourcePosition > destinationPosition) {
        await this.tasks.increment(
          { position: 1 },
          { where: { columnId: sourceColumnId, position: { [Op.between]: [destinationPosition, sourcePosition - 1] } } },
        );
      }
      // If task moved down
      else if (sourcePosition < destinationPosition) {
        await this.tasks.decrement(
          { position: 1 },
          { where: { columnId: sourceColumnId, position: { [Op.between]: [sourcePosition + 1, destinationPosition] } } },
        );
      }
    }

    // Check if task moved in different column and update positions of other tasks of both columns
    else if (sourceColumnId !== destinationColumnId) {
      // Update positions of tasks of source columns
      await this.tasks.decrement({ position: 1 }, { where: { columnId: sourceColumnId, position: { [Op.gte]: sourcePosition + 1 } } });
      // Update positions of tasks of destination columns
      await this.tasks.increment({ position: 1 }, { where: { columnId: destinationColumnId, position: { [Op.gte]: destinationPosition } } });
    }

    const updateTaskData = await this.tasks.update(
      { columnId: destinationColumnId, position: destinationPosition },
      { where: { id: taskId, columnId: sourceColumnId, position: sourcePosition } },
    );

    return updateTaskData;
  }

  public async deleteTask(taskId: string, userId: string) {
    const findTask = await this.tasks.findOne({ where: { id: taskId, userId: userId } });
    if (!findTask) throw new HttpException(404, `This task ${taskId} was not found`);

    const deleteTaskData = await this.tasks.destroy({ where: { id: taskId } });
    return deleteTaskData;
  }
}
