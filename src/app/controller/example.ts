import { provide, Context, inject, controller, get } from "midway";
import { IHistoryService } from "../service/history/interface";
import { History } from "../entity/History";

@provide()
@controller('/addHistory')
export class ExampleController {

  @inject()
  ctx: Context;

  @inject('historyService')
  historyService: IHistoryService;

  

  @get('/')
  async hello(): Promise<void> {
    const history: History = await this.historyService.addUserWatchHistory({
      programId: 1,
      watch_time_length: 1,
      time_length: 1,
      token: 'ddd'
    });
    this.ctx.body = {
      history
    }
  }

}