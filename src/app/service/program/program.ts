import { provide, inject, Context } from "midway";
import {
  IGetOneProgramOptions,
  IGetOneProgramResult,
  IGetProgramWallResult,
  IGetProgramWallOptions,
  IProgramService,
  IGetMatchedProgrammesOptions,
  IGetMatchedProgrammesResult,
} from "./interface";
import { Connection } from "typeorm";
import { Program } from "../../entity/Program";
import { ProgramSet } from "../../entity/ProgramSet";
import { MOVIE_WALL_DEFAULT_RETURNED_COUNT } from "../../const-definition/limit-value";

@provide("programService")
export class ProgramService implements IProgramService {
  @inject()
  ctx: Context;

  @inject()
  connection: Connection;

  async getOneProgram(
    options: IGetOneProgramOptions
  ): Promise<IGetOneProgramResult> {
    const id = options.id;
    let programRepository = this.connection.getRepository(Program);
    let program = await programRepository.findOne({ id: id });
    return program;
  }

  async getProgramWall(
    options: IGetProgramWallOptions
  ): Promise<IGetProgramWallResult> {
    const program_type: string = options.program_type;
    const program_classification: string = options.program_classification;
    const release_year: number = options.realease_year;
    const program_area: string = options.program_area;
    const last_id: number = options.last_id;
    const count: number = options.count || 10;

    const program_set_repository = this.connection.getRepository(ProgramSet);
    let handle = program_set_repository.createQueryBuilder("program_set");

    if (program_type) {
      // 添加 where condition
      handle = handle.where("program_type = :program_type", { program_type });
    }
    if (program_classification) {
      // 添加 where condition
      handle = handle.andWhere(
        "program_classification = :program_classification",
        { program_classification }
      );
    }
    if (release_year) {
      // 添加 where condition
      handle = handle.andWhere("release_year = :release_year", {
        release_year,
      });
    }
    if (program_area) {
      handle = handle.andWhere("program_area = :program_area", {
        program_area,
      });
    }
    if (last_id) {
      handle = handle.andWhere("id > :last_id", { last_id });
    }
    handle = handle.orderBy("program_set.id", "ASC").limit(count);

    const program_list: Program[] = await handle.getMany();
    return program_list;
  }

  async getMatchedProgrammes(
    options: IGetMatchedProgrammesOptions
  ): Promise<IGetMatchedProgrammesResult> {
    const key_word: string = options.key_word;
    const programme_set_repository = this.connection.getRepository(ProgramSet);
    const matched_programmes: Program[] = await programme_set_repository
      .createQueryBuilder("program_set")
      .where("program_set.name like :key_word", { key_word: `%${ key_word }%` })
      .limit(MOVIE_WALL_DEFAULT_RETURNED_COUNT)
      .getMany();
    return matched_programmes;
  }
}
