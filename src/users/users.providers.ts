import { DataSource } from 'typeorm';
import { UsersEntity } from './dto/users.entity';

export const usersProviders = [
  {
    provide: UsersEntity,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UsersEntity),
    inject: ['DATA_SOURCE'],
  },
];
