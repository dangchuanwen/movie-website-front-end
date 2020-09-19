import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProgramSet } from "./ProgramSet";

@Entity()
export class RecommendSearch {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => ProgramSet)
  @JoinColumn()
  program: ProgramSet;
}