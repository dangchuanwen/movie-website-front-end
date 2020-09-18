import { Program } from "../../entity/Program";

export interface IGetOneProgramOptions{
  id: number;
}

export interface IGetProgramWallOptions {
  program_type: string;
  program_classification: string;
  realease_year: number;
  program_area: string;
  last_id: number;
  count: number;
}


export interface IGetOneProgramResult extends Program{}

export interface IGetProgramWallResult extends Array<Program>{}

export interface IProgramService {
  getOneProgram(options?: IGetOneProgramOptions): Promise<IGetOneProgramResult>;

  getProgramWall(options: IGetProgramWallOptions): Promise<IGetProgramWallResult>;
}