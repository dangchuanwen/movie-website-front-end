import { Program } from "../../entity/Program";
import { ProgramSet } from "../../entity/ProgramSet";

export interface IGetOneProgramOptions {
  id: number;
}
export interface IGetOneProgramResult extends Program {}

export interface IGetProgramWallOptions {
  program_type: string;
  program_classification: string;
  realease_year: number;
  program_area: string;
  last_id: number;
  count: number;
}
export interface IGetProgramWallResult extends Array<Program> {}

export interface IGetMatchedProgrammesOptions {
  key_word: string;
}
export interface IGetMatchedProgrammesResult extends Array<Program> {}


export interface IGetRealProgrammeByNameAndOrderOptions {
  name: string;
  order: number;
}
export interface IGetRealProgrammeByNameAndOrderResult extends Program {}


export interface IGetSearchProgrammeOptions {
  name: string;
}
export interface IGetSearchProgrammeResult extends Array<ProgramSet> {}

export interface IProgramService {
  getOneProgram(options?: IGetOneProgramOptions): Promise<IGetOneProgramResult>;

  getProgramWall(
    options: IGetProgramWallOptions
  ): Promise<IGetProgramWallResult>;

  getMatchedProgrammes(
    options: IGetMatchedProgrammesOptions
  ): Promise<IGetMatchedProgrammesResult>;

  getRealProgrammeByNameAndOrder(options: IGetRealProgrammeByNameAndOrderOptions): Promise<IGetRealProgrammeByNameAndOrderResult>;

  getSearchProgramme(options: IGetSearchProgrammeOptions): Promise<IGetSearchProgrammeResult>;
}
