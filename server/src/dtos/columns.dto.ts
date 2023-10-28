import { IsString, IsUUID } from 'class-validator';

export class CreateColumnDto {
  @IsUUID()
  public id: string;

  @IsString()
  public title: string;
}

export class UpdateColumnDto {
  @IsString()
  public title: string;
}
