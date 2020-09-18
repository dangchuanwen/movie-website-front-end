import { Context, controller, get, inject, provide } from "midway";
import { IHotService } from "../../service/hot/interface";
import { HttpResponse } from "../../tool/tool";
import { SUCEESS, QUERY_DATA_ERROR } from "../../const-definition/status-code";

@provide()
@controller("/hot")
export class HotController {
  @inject()
  ctx: Context;

  @inject("hotService")
  hotService: IHotService;

  @get("/get")
  async getHotList() {
    try {
      const hot_list = await this.hotService.getHotList();
      this.ctx.body = HttpResponse(hot_list, SUCEESS);
    } catch (err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse([], QUERY_DATA_ERROR, 'there may be an error in getHotList function of hotService.');
    }
  }
}
