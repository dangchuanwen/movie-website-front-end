import { provide, controller, inject, get } from "midway";
import { Missing_PARAMS, QUERY_DATA_ERROR, SUCEESS } from "../../const-definition/status-code";
import { Program } from "../../entity/Program";
import { DecoratedContext } from "../../interface/Support";
import {
  IGetRealProgrammeByNameAndOrderOptions,
  IProgramService,
} from "../../service/program/interface";
import { HttpResponse } from "../../tool/tool";

@provide()
@controller("/programme-collection-item")
export class ProgrammeCollectionItemController {
  @inject()
  ctx: DecoratedContext<IGetRealProgrammeByNameAndOrderOptions>;

  @inject("programService")
  programService: IProgramService;

  @get("/get")
  async getProgrammeCollectionItem() {
    try {
      const name: string = this.ctx.query.name;
      const order: number = this.ctx.query.order;
      if (!name || !order) {
        this.ctx.body = HttpResponse({}, Missing_PARAMS, "miss name param or order param.");
        return;
      }
      const program: Program = await this.programService.getRealProgrammeByNameAndOrder(
        {
          name,
          order,
        }
      );
      this.ctx.body = HttpResponse(program, SUCEESS);
    } catch (err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse({}, QUERY_DATA_ERROR, 'there may be an error in getRealProgrammeByNameAndOrder of programService.');
    }
  }
}
