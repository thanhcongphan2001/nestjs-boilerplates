import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Hehe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  emailE: string;

  @CreateDateColumn()
  createdAt: Date;
}
