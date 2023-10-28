import { HttpException } from '@/exceptions/HttpException';
import TaskModel from '@/models/tasks.model';
import { Op } from 'sequelize';

export class TaskService {
  public tasks = TaskModel;

  public async findAllTasksOfUser(userId: string) {
    const findTasks = await this.tasks.findAll({ where: { userId: userId }, order: [['updatedAt', 'DESC']] });
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
    const { sourceColumnId, destinationColumnId } = taskPositionData;

    const findTask = await this.tasks.findOne({ where: { columnId: sourceColumnId, id: taskId } });
    if (!findTask) throw new HttpException(404, `This task ${taskId} was not found`);

    const updateTaskData = await this.tasks.update({ columnId: destinationColumnId }, { where: { id: taskId, columnId: sourceColumnId } });

    return updateTaskData;
  }

  public async deleteTask(taskId: string, userId: string) {
    const findTask = await this.tasks.findOne({ where: { id: taskId, userId: userId } });
    if (!findTask) throw new HttpException(404, `This task ${taskId} was not found`);
    const deleteTaskData = await this.tasks.destroy({ where: { id: taskId } });
    return deleteTaskData;
  }
}
