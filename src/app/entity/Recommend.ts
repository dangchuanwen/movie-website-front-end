import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Program } from './Program';

@Entity()
export class Recommend {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Program)
  @JoinColumn()
  program: Program;

  @Column()
  poster_url: string;

  @Column()
  poster_main_color: string;

  @Column({
    default: 0
  })
  is_most_hot: number;

  @Column({
    default: 0
  })
  is_very_hot: number;
}
