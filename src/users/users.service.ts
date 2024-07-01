import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, FindUserDto, UpdateUserDto } from './dto/users.dto';
import { Repository } from 'typeorm';
import { UsersEntity } from './dto/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersEntity)
    public usersRepository: Repository<UsersEntity>,
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

  async findUsers(findUserDto: FindUserDto): Promise<UsersEntity[]> {
    try {
      const queryObject = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(findUserDto).filter(([_, v]) => v != null),
      );

      const users = await this.usersRepository.find({
        where: queryObject,
      });

      if (users.length === 0) {
        return null;
      }

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<UsersEntity> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateData: UpdateUserDto): Promise<UsersEntity> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (
        user.email == updateData.email &&
        user.name == updateData.name &&
        user.phone == updateData.phone &&
        user.txid == updateData.txid
      ) {
        throw new ConflictException('No data was affected');
      }

      const updatedUser = await this.usersRepository.update(id, updateData);

      if (updatedUser.affected === 0) {
        throw new ConflictException('No data was affected');
      }

      return this.usersRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  // TODO: delete user
}
