import { provide, inject, Context } from "midway";
import { IProgramOptions, IProgramResult, IProgramService } from "./interface";
import { Connection } from "typeorm";
import { Program } from "../../entity/Program";

@provide("programService")
export class ProgramService implements IProgramService {
  @inject()
  ctx: Context;

  @inject()
  connection: Connection;

  async getProgram(options: IProgramOptions): Promise<IProgramResult> {
    try {
      const id = options.id;
      let programRepository = this.connection.getRepository(Program);
      let program = await programRepository.findOne({ id: id });
      return program;
    } catch(err) {
      this.ctx.logger.error(err);
      return null;
    }
  }
}
