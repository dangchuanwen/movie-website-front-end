import { provide, inject, Context } from 'midway';
import { IRecommendService, IGetRecommendListResult, IGetRecommendSearchListResult } from './interface';
import { Connection } from 'typeorm';
import { Recommend } from '../../entity/Recommend';
import { RecommendSearch } from '../../entity/RecommendSearch';

@provide('recommendService')
export class RecommendService implements IRecommendService {
  @inject()
  ctx: Context;

  @inject()
  connection: Connection;

  async getRecommendList(): Promise<IGetRecommendListResult> {
    const recommend_repository = this.connection.getRepository(Recommend);
    const recommend_list: Recommend[] = await recommend_repository
      .createQueryBuilder('recommend')
      .innerJoinAndSelect('recommend.program', 'program')
      .getMany();
    return recommend_list;
  }

  async getRecommendSearchList(): Promise<IGetRecommendSearchListResult> {
    const recommend_search_repository = this.connection.getRepository(RecommendSearch);
    const recommend_search_list: RecommendSearch[] = await recommend_search_repository
      .createQueryBuilder('recommend_search')
      .innerJoinAndSelect('recommend_search.program', 'program')
      .getMany();
    return recommend_search_list;
  }
}
