import { HttpException } from '@/exceptions/HttpException';
import ColumnModel from '@/models/columns.model';

export class ColumnService {
  public columns = ColumnModel;

  public async findAllColumnsOfUser(userId: string) {
    const findColumns = await this.columns.findAll({ where: { userId: userId }, order: [['createdAt', 'ASC']] });
    return findColumns;
  }

  public async createColumn(userId: string, columnData: any) {
    const createColumnData = await this.columns.create({ ...columnData, userId });
    return createColumnData;
  }

  public async updateColumn(columnId: string, userId: string, columnData: any) {
    const findColumn = await this.columns.findOne({ where: { id: columnId, userId: userId } });
    if (!findColumn) throw new HttpException(404, `This column ${columnId} was not found`);

    const updateColumnData = await this.columns.update({ ...columnData }, { where: { id: columnId } });
    return updateColumnData;
  }

  public async deleteColumn(columnId: string, userId: string) {
    const findColumn = await this.columns.findOne({ where: { id: columnId, userId: userId } });
    if (!findColumn) throw new HttpException(404, `This column ${columnId} was not found`);

    const deleteColumnData = await this.columns.destroy({ where: { id: columnId } });
    return deleteColumnData;
  }
}
