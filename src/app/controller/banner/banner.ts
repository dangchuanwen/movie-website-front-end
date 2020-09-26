import { Context, controller, get, inject, provide } from 'midway';
import { Banner } from '../../entity/Banner';
import { IBannerService } from '../../service/banner/interface';
import { HttpResponse } from '../../tool/tool';
import { SUCCESS, QUERY_DATA_ERROR } from '../../const-definition/status-code';

@provide()
@controller('/banner')
export class BannerController {
  @inject()
  ctx: Context;

  @inject('bannerService')
  bannerService: IBannerService;

  @get('/get')
  async getBannerList() {
    try {
      const banner_list: Banner[] = await this.bannerService.getBannerList();
      this.ctx.body = HttpResponse(banner_list, SUCCESS);
    } catch (err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse([], QUERY_DATA_ERROR, 'there may be an error in getBannerList function of bannerService.');
    }
  }
}
