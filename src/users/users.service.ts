import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, FindUserDto } from './dto/users.dto';
import { Repository } from 'typeorm';
import { UsersEntity } from './dto/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<UsersEntity>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<UsersEntity> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const user = new UsersEntity({
        ...createUserDto,
        password: hashedPassword,
      });

      return await this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  // TODO: find user
  async findUser(findUserDto: FindUserDto): Promise<UsersEntity> {
    try {
      const queryObject = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(findUserDto).filter(([_, v]) => v != null),
      );

      return await this.usersRepository.findOneBy({
        ...queryObject,
      });
    } catch (error) {
      throw error;
    }
  }

  // TODO: find all users
  async findAll() {}

  // TODO: update user
  async update() {}

  // TODO: delete user
}
