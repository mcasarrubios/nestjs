import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';
import { UserRoles } from './user.constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'email',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({ length: 30 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column('enum', {
    enum: UserRoles,
    array: true,
  })
  roles: string[];

}
