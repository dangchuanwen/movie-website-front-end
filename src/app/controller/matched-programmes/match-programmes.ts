import { controller, get, inject, provide } from "midway";
import { QUERY_DATA_ERROR, SUCEESS } from "../../const-definition/status-code";
import { DecoratedContext } from "../../interface/Support";
import { IGetMatchedProgrammesOptions } from "../../service/program/interface";
import { ProgramService } from "../../service/program/program";
import { HttpResponse } from "../../tool/tool";

@provide()
@controller('/matched-programmes')
export class MatchedProgrammesController {
  @inject()
  ctx: DecoratedContext<IGetMatchedProgrammesOptions>;

  @inject("programService")
  programmeService: ProgramService;

  @get("/get")
  async getMatchedProgrammes() {
    try {
      const key_word = this.ctx.query.key_word;
      const matched_programmes = await this.programmeService.getMatchedProgrammes({
        key_word
      });
      this.ctx.body = HttpResponse(matched_programmes, SUCEESS);
    } catch(err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse([], QUERY_DATA_ERROR, 'there may be an error in getMatchedProgrammes of the programService.');
    }

  }
}