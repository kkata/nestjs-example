import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const dto: CreateUserDto = {
        name: 'Joe',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async (dto: CreateUserDto) => {
          const user: User = {
            id: 1,
            ...dto,
          };
          return user;
        });

      expect(service.create(dto)).resolves.toEqual({
        id: 1,
        ...dto,
      });
    });
  });

  describe('findAll()', () => {
    it('should successfully return all users', () => {
      const user: User = {
        id: 1,
        name: 'Joe',
      };

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return [user];
      });

      expect(service.findAll()).resolves.toEqual([user]);
    });

    it('should return an empty array if no users are found', () => {
      const user: User[] = [];

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return user;
      });

      expect(service.findAll()).resolves.toEqual(user);
    });
  });

  describe('findOne()', () => {
    it('should return user', () => {
      const user: User = {
        id: 1,
        name: 'Joe',
      };

      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        return user;
      });

      expect(service.findOne(1)).resolves.toEqual(user);
    });

    it('should return not found exeption', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(service.findOne(2)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
