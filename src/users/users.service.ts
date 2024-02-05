import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyUser } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(MyUser)
    private usersRepository: Repository<MyUser>,
  ) {}

  getHashPassword = (password: string) => {
    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash;
  };
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create({
        ...createUserDto,
        password: this.getHashPassword(createUserDto.password),
      });
      const savedUser = await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all users sssss`;
  }

  async findOne(id: number) {
    try {
      const getUser = await this.usersRepository.findOne({
        where: { id: id },
      });

      if (getUser) {
        return getUser;
      } else {
        return `User with ID ${id} not found`;
      }
    } catch (error) {
      return `Error while fetching user with ID ${id}: ${error.message}`;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updateUser = await this.usersRepository.update(id, updateUserDto);
      return updateUser;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const deleteUser = await this.usersRepository.delete(id);

      if (deleteUser.affected && deleteUser.affected > 0) {
        return `User with ID ${id} deleted successfully`;
      } else {
        return `User with ID ${id} not found`;
      }
    } catch (error) {
      return `Error deleting user with ID ${id}: ${error.message}`;
    }
  }
}
