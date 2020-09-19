import { controller, get, inject, provide } from "midway";
import { QUERY_DATA_ERROR, SUCEESS } from "../../const-definition/status-code";
import { ProgramSet } from "../../entity/ProgramSet";
import { DecoratedContext } from "../../interface/Support";
import {
  IGetSearchProgrammeOptions,
  IProgramService,
} from "../../service/program/interface";
import { HttpResponse } from "../../tool/tool";

@provide()
@controller("/search-programme")
export class SearchProgrammeController {
  @inject()
  ctx: DecoratedContext<IGetSearchProgrammeOptions>;

  @inject("programService")
  programmeService: IProgramService;

  @get("/get")
  async getSearchProgrammeResult() {
    try {
      const name: string = this.ctx.query.name;
      const search_programme_result: ProgramSet[] = await this.programmeService.getSearchProgramme(
        {
          name,
        }
      );
      this.ctx.body = HttpResponse(search_programme_result, SUCEESS);
    } catch (err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse([], QUERY_DATA_ERROR, 'there may be an error in getSearchProgramme of the programService.');
    }
  }
}
