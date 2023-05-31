import { IsEnum, IsNotEmpty } from 'class-validator';
import { Priority } from 'src/enums/todo.enums';

export class CreateToDoDTO {
  @IsNotEmpty()
  title: string;
  summary: string;
  @IsEnum(Priority)
  priority: Priority;
}
