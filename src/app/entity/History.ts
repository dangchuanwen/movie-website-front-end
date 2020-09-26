import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { Program } from './Program';
import { User } from './User';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Program)
  @JoinColumn()
  program: Program;

  @Column()
  watch_time_length: number;

  @Column()
  time_length: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({
    type: 'timestamp'
  })
  timestamp: number;
}
