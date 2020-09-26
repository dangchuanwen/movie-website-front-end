import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Program } from './Program';

@Entity()
export class Hot {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Program)
  @JoinColumn()
  program: Program;

  @Column()
  poster_url: string;

}
