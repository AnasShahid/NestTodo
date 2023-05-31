import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Repository } from 'typeorm';
import { CreateToDoDTO } from './dto/create-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todosRepository: Repository<TodoEntity>,
  ) {}
  create(data: CreateToDoDTO): Promise<TodoEntity> {
    try {
      const todo = this.todosRepository.create({
        ...data,
      });
      return this.todosRepository.save(todo);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  delete(id: number) {
    throw new HttpException('Method not implemented.', HttpStatus.NOT_FOUND);
  }
  async update(id: number, data: UpdateUserDto) {
    let user = await this.findOne(id);
    user = {
      ...user,
      ...data,
    };
    return this.todosRepository.save(user);
  }
  async findOne(id: number): Promise<TodoEntity> {
    try {
      const user = await this.todosRepository.findOneOrFail({
        where: { id: id },
      });
      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }
  findAll(): Promise<TodoEntity[]> {
    return this.todosRepository.find();
  }
}
