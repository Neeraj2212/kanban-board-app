import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsUUID()
  public id: string;

  @IsUUID()
  public columnId: string;

  @IsString()
  public content: string;

  @IsNumber()
  public position: number;
}

export class UpdateTaskDto {
  @IsString()
  public content: string;
}

export class UpdateTaskPositionDto {
  @IsUUID()
  public sourceColumnId: string;

  @IsUUID()
  public destinationColumnId: string;
}
