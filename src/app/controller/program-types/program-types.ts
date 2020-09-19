import { Context, controller, get, inject, provide } from "midway";
import { QUERY_DATA_ERROR, SUCEESS } from "../../const-definition/status-code";
import { HttpResponse } from "../../tool/tool";
import { datas as program_types } from "./types";

@provide()
@controller('/program-types')
export class ProgramTypesController {
  @inject()
  ctx: Context;

  @get('/get')
  async getProgramTypes() {
    try {
      this.ctx.body = HttpResponse(program_types, SUCEESS);
    } catch(err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse([], QUERY_DATA_ERROR, 'there may be an error when require the program type data.');
    }
  }
}