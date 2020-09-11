import { provide } from "midway";
import { IProgramSetOptions, IProgramSetResult, IProgramSetService } from "./interface";
import { createConnection } from "typeorm";
import { ProgramSet } from "../../entity/ProgramSet";

@provide("programSetService")
export class ProgramSetService implements IProgramSetService {
  async getProgram(options: IProgramSetOptions):Promise<IProgramSetResult> {
    const con = await createConnection();
    const id = options.id;
    const programSetRepository = con.getRepository(ProgramSet);
    const program = programSetRepository.findOne({id});
    return program;
  }
}