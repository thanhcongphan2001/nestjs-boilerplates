import { Injectable } from '@nestjs/common';
import { CreateHeheDto } from './dto/create-hehe.dto';
import { UpdateHeheDto } from './dto/update-hehe.dto';

@Injectable()
export class HeheService {
  create(createHeheDto: CreateHeheDto) {
    return 'This action adds a new hehe';
  }

  findAll() {
    return `This action returns all hehe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hehe`;
  }

  update(id: number, updateHeheDto: UpdateHeheDto) {
    return `This action updates a #${id} hehe`;
  }

  remove(id: number) {
    return `This action removes a #${id} hehe`;
  }
}
