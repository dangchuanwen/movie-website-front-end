import { provide, inject, Context } from "midway";
import { IRecommendService, IRecommendResult } from "./interface";
import { Connection } from "typeorm";
import { Recommend } from "../../entity/Recommend";

@provide("recommendService")
export class RecommendService implements IRecommendService {
  @inject()
  ctx: Context;

  @inject()
  connection: Connection;

  async getRecommendList(): Promise<IRecommendResult> {
    try {
      const recommendRepository = this.connection.getRepository(Recommend);
      const recommendList: Recommend[] = await recommendRepository
        .createQueryBuilder("recommend")
        .innerJoinAndSelect("recommend.program", "program")
        .getMany();
      return recommendList;
    } catch (err) {
      this.ctx.logger.error(err);
      return [];
    }
  }
}
