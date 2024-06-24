import {
  CreateUserDto,
  FindUserByIdDto,
  FindUserDto,
  UpdateUserDto,
} from './dto/users.dto';
import { UsersEntity } from './dto/users.entity';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findUser(@Query() query: FindUserDto): Promise<UsersEntity[]> {
    try {
      const user = await this.usersService.findUsers(query);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findById(@Param() params: FindUserByIdDto): Promise<UsersEntity> {
    try {
      const user = await this.usersService.findById(params.id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param() params: FindUserByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UsersEntity> {
    try {
      const user = await this.usersService.update(params.id, updateUserDto);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
