import { Context, controller, get, inject, provide } from 'midway';
import { QUERY_DATA_ERROR, SUCCESS } from '../../const-definition/status-code';
import { IHistoryService } from '../../service/history/interface';
import { HttpResponse } from '../../tool/tool';

@provide()
@controller('/history')
export class HistoryController {
  @inject()
  ctx: Context;

  @inject('historyService')
  historyService: IHistoryService;

  @get('/all/get')
  async getAllWatchHistoryList() {
    try {
      const token = String(this.ctx.cookies.get('token'));
      const all_watch_history = await this.historyService.getUserAllWatchHistory({
        token
      });
      this.ctx.body = HttpResponse(all_watch_history, SUCCESS);
    } catch (err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse([], QUERY_DATA_ERROR, 'there may be an error in getUserWatchHistory of historyService.');
    }
  }

  @get('/in-latest-week/get')
  async getWatchHistoryInLatestWeek() {
    try {
      const token = this.ctx.cookies.get('token');
      const user_watch_history_in_latest_week = await this.historyService.getUserWatchHistoryInLatestWeek({
        token
      });
      this.ctx.body = HttpResponse(user_watch_history_in_latest_week, SUCCESS);
    } catch (err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse([], QUERY_DATA_ERROR, 'there may be an error in getUserWatchHistoryInlatestWeek function of the historyService.');
    }
  }

}
