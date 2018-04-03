import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator";
import { USER_ROLE } from './user.constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'email',
    length: 100,
    unique: true
  })
  email: string;

  @Column({ length: 30 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({
    nullable: false,
    type: String,
    array: true,
    default: `{${USER_ROLE}}`,
  })
  roles: string[];

}