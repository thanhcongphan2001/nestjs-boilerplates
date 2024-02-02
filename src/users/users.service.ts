import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyUser } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcryptjs'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(MyUser)
    private usersRepository: Repository<MyUser>,
  ) { }

  getHashPassword = (password: string) => {
    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash
  }
  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }

  findAll() {
    return `This action returns all users ss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${updateUserDto} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
