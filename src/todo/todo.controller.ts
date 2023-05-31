import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateToDoDTO } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findOne(id);
  }

  // Get todo by query params
  @Get()
  findByQueryParams(@Query('priority') priority: string) {
    return this.todoService.findAll();
    //return [{ priority }];
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body(new ValidationPipe()) createTodoDto: CreateToDoDTO) {
    this.todoService.create(createTodoDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, data: UpdateUserDto) {
    return this.todoService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.delete(id);
  }
}
