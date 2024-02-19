import { PartialType } from '@nestjs/mapped-types';
import { CreateHeheDto } from './create-hehe.dto';

export class UpdateHeheDto extends PartialType(CreateHeheDto) {}
