import { ColumnController } from '@/controllers/column.contoller';
import { CreateColumnDto, UpdateColumnDto } from '@/dtos/columns.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class ColumnRoutes implements Routes {
  public path = '/column';
  public router = Router();
  public columnController = new ColumnController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Create new column
    this.router.post(`${this.path}`, validationMiddleware(CreateColumnDto, 'body'), authMiddleware, this.columnController.createColumn);
    // Get all columns of user
    this.router.get(`${this.path}`, authMiddleware, this.columnController.getAllColumnsOfUser);
    // Update Column by id
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(UpdateColumnDto, 'body', true), this.columnController.updateColumn);
    // Delete Column by id
    this.router.delete(`${this.path}/:id`, authMiddleware, this.columnController.deleteColumn);
  }
}
