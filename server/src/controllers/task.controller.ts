import { CreateTaskDto, UpdateTaskDto, UpdateTaskPositionDto } from '@/dtos/tasks.dto';
import { RequestWithUserId } from '@/interfaces/auth.interface';
import { TaskService } from '@/services/task.service';
import { Response, NextFunction } from 'express';

export class TaskController {
  public taskService = new TaskService();

  public getAllTasksOfUser = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.userId;
      const findAllTasksData = await this.taskService.findAllTasksOfUser(userId);

      res.status(200).json({ data: findAllTasksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createTask = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.userId;
      const taskData: CreateTaskDto = req.body;
      const createTaskData = await this.taskService.createTask(userId, taskData);

      res.status(201).json({ data: createTaskData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.params.id;
      const taskData: UpdateTaskDto = req.body;
      const userId: string = req.userId;
      const updateTaskData = await this.taskService.updateTask(taskId, userId, taskData);

      res.status(200).json({ data: updateTaskData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public updateTaskPosition = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const taskPositionData: UpdateTaskPositionDto = req.body;
      const taskId: string = req.params.id;
      const updateTaskData = await this.taskService.updateTaskPosition(taskId, taskPositionData);

      res.status(200).json({ data: updateTaskData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTask = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.params.id;
      const userId: string = req.userId;
      const deleteTaskData = await this.taskService.deleteTask(taskId, userId);

      res.status(200).json({ data: deleteTaskData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
