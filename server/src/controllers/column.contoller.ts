import { CreateColumnDto, UpdateColumnDto } from '@/dtos/columns.dto';
import { RequestWithUserId } from '@/interfaces/auth.interface';
import { ColumnService } from '@/services/column.service';
import { Response, NextFunction } from 'express';

export class ColumnController {
  public columnService = new ColumnService();

  public getAllColumnsOfUser = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.userId;
      const findAllColumnsData = await this.columnService.findAllColumnsOfUser(userId);

      res.status(200).json({ data: findAllColumnsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createColumn = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.userId;
      const columnData: CreateColumnDto = req.body;
      const createColumnData = await this.columnService.createColumn(userId, columnData);

      res.status(201).json({ data: createColumnData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateColumn = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const columnId: string = req.params.id;
      const columnData: UpdateColumnDto = req.body;
      const userId: string = req.userId;
      const updateColumnData = await this.columnService.updateColumn(columnId, userId, columnData);

      res.status(200).json({ data: updateColumnData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteColumn = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const columnId: string = req.params.id;
      const userId: string = req.userId;
      const deleteColumnData = await this.columnService.deleteColumn(columnId, userId);

      res.status(200).json({ data: deleteColumnData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
