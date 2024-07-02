import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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

    it('should return not found exception', () => {
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

  describe('update()', () => {
    it('should return update result user', () => {
      const dto: CreateUserDto = {
        name: 'Jack2',
      };

      const user: User = {
        id: 1,
        name: 'Jack2',
      };

      jest.spyOn(service, 'update').mockImplementation(async () => {
        return user;
      });

      expect(service.update(1, dto)).resolves.toEqual(user);
    });

    it('should return not found exception', () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce({
        statusCode: 404,
        message: 'Not Found',
      });

      const dto: CreateUserDto = {
        name: 'Jack2',
      };

      expect(service.update(2, dto)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('remove()', () => {
    it('should return remove result', () => {
      const result: DeleteResult = {
        raw: [],
        affected: 1,
      };

      jest.spyOn(service, 'remove').mockImplementation(async () => {
        return result;
      });

      expect(service.remove(1)).resolves.toEqual(result);
    });

    it('should return not found exception', () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(service.remove(2)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
