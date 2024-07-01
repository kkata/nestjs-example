import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    comment: 'accountID',
  })
  readonly id: number;

  @Column('varchar', {
    comment: 'accountName',
  })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
