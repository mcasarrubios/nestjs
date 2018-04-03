import { 
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';

import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column('text')
  description: string;

}