import { CreateUserDto, FindUserDto } from './dto/users.dto';
import { UsersEntity } from './dto/users.entity';
import { UsersService } from './users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findUser(@Query() query: FindUserDto): Promise<UsersEntity> {
    try {
      return await this.usersService.findUser(query);
    } catch (error) {
      throw error;
    }
  }
}
