import { Context, controller, get, inject, provide } from 'midway';
import { Recommend } from '../../entity/Recommend';
import { IRecommendService } from '../../service/recommend/interface';
import { HttpResponse } from '../../tool/tool';
import { SUCCESS, QUERY_DATA_ERROR } from '../../const-definition/status-code';

@provide()
@controller('/recommend')
export class RecommendController {
  @inject()
  ctx: Context;

  @inject('recommendService')
  recommendService: IRecommendService;

  @get('/get')
  async getHotRecommendList() {
    try {
      const hot_recommend_list: Recommend[] = await this.recommendService.getRecommendList();
      this.ctx.body = HttpResponse(hot_recommend_list, SUCCESS);
    } catch (err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse([], QUERY_DATA_ERROR, 'there may be an error in getRecommendList function of recommendService.');
    }
  }
}
