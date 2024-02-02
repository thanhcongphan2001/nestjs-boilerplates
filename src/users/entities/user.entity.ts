import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class MyUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  password: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}
