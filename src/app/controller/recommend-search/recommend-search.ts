import { Context, controller, get, inject, provide } from 'midway';
import { QUERY_DATA_ERROR, SUCCESS } from '../../const-definition/status-code';
import { IRecommendService } from '../../service/recommend/interface';
import { HttpResponse } from '../../tool/tool';

@provide()
@controller('/recommend-search')
export class RecommendSearchController {
  @inject()
  ctx: Context;

  @inject('recommendService')
  recommendService: IRecommendService;

  @get('/get')
  async getRecommendSearchList() {
    try {
      const recommend_search_list = await this.recommendService.getRecommendSearchList();
      this.ctx.body = HttpResponse(recommend_search_list, SUCCESS);
    } catch (err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse([], QUERY_DATA_ERROR, 'there may be an error in getRecommendSearch function of the recommendService.');
    }
  }
}
