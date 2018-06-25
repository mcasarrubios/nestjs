import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

}