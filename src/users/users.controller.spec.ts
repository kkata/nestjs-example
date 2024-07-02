import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
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

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should create a user', () => {
      const dto: CreateUserDto = {
        name: 'Joe',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async (dto: CreateUserDto) => {
          return {
            id: 1,
            ...dto,
          };
        });

      expect(controller.create(dto)).resolves.toEqual({
        id: 1,
        ...dto,
      });
    });
  });

  describe('findAll()', () => {
    it('should return all users', () => {
      const user: User = {
        id: 1,
        name: 'Joe',
      };

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return [user];
      });

      expect(controller.findAll()).resolves.toEqual([user]);
    });

    it('should return an empty array', () => {
      const user: User[] = [];

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return user;
      });

      expect(controller.findAll()).resolves.toEqual(user);
    });
  });

  describe('findOne()', () => {
    it('should return a user', () => {
      const user: User = {
        id: 1,
        name: 'Joe',
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        return user;
      });

      expect(controller.findOne(1)).resolves.toEqual(user);
    });

    it('should return not found exeption', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce({
        statusCode: 404,
        message: 'Not found',
      });

      expect(controller.findOne(2)).rejects.toEqual({
        statusCode: 404,
        message: 'Not found',
      });
    });
  });
});
