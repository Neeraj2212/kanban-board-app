import { TaskController } from '@/controllers/task.controller';
import { CreateTaskDto, UpdateTaskPositionDto, UpdateTaskDto } from '@/dtos/tasks.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class TaskRoutes implements Routes {
  public path = '/task';
  public router = Router();
  public taskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Create new task
    this.router.post(`${this.path}`, validationMiddleware(CreateTaskDto, 'body'), authMiddleware, this.taskController.createTask);
    // Get all tasks of user
    this.router.get(`${this.path}`, authMiddleware, this.taskController.getAllTasksOfUser);
    // Move Task
    this.router.put(
      `${this.path}/move/:id`,
      authMiddleware,
      validationMiddleware(UpdateTaskPositionDto, 'body', true),
      this.taskController.updateTaskPosition,
    );
    // Update Task by id
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(UpdateTaskDto, 'body', true), this.taskController.updateTask);
    // Delete Task by id
    this.router.delete(`${this.path}/:id`, authMiddleware, this.taskController.deleteTask);
  }
}
