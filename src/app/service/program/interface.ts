import { Program } from "../../entity/Program";


export interface IProgramOptions{
  id: number;
}

export interface IProgramResult extends Program{}

export interface IProgramService {
  getProgram(options?: IProgramOptions): Promise<IProgramResult>;
}