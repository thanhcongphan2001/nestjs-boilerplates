import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyUser } from './entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(MyUser)
    private usersRepository: Repository<MyUser>,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  findOneByEmail(username: string) {
    return this.usersRepository.findOne({
      where: { email: username },
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

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

  async register(user: CreateUserDto) {
    const { name, email, password } = user;
    const isExits = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (isExits) {
      throw new BadRequestException(`Email ${email} đã tồn tại`);
    }
    const newUser = this.usersRepository.create({
      ...user,
      password: this.getHashPassword(password),
    });
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }

  async updateUserToken(refresh_token, id) {
    return await this.usersRepository.update(id, {
      refresh_token: refresh_token,
    });
  }
  async findUserByToken(refresh_token) {
    return await this.usersRepository.findOne({
      where: { refresh_token: refresh_token },
    });
  }
}
