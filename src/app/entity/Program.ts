import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum ProgramType {
  MOVIE= '电影',
  TV_PLAY= '电视剧',
  COMIC= '动漫',
  VARIETY_SHOW= '综艺'
}

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ProgramType,
    default: ProgramType.MOVIE
  })
  program_type: ProgramType;

  @Column()
  name: string;

  @Column({
    length: 800
  })
  poster_url: string;

  @Column({
    default: 1
  })
  fragment_number: number;

  @Column({
    default: 1
  })
  fragment_order: number;

  @Column()
  director_name: string;

  @Column({
    length: 800
  })
  main_performer: string;

  @Column()
  program_classification: string;

  @Column()
  program_area: string;

  @Column()
  program_language: string;

  @Column()
  release_year: string;

  @Column({
    default: 0
  })
  time_length: number;

  @Column({
    default: 0
  })
  play_number: number;

  @Column({
    default: 0
  })
  play_number_in_today: number;

  @Column({
    length: 800
  })
  program_introduce: string;

  @Column({
    default: 8.5
  })
  program_score: number;

  @Column({
    type: 'text'
  })
  m3u8_link: string;

  @Column({
    type: 'text'
  })
  language: string;

  @Column({
    default: 1,
  })
  is_show: number;
}
