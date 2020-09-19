import { Recommend } from "../../entity/Recommend";
import { RecommendSearch } from "../../entity/RecommendSearch";

export interface IGetRecommendListOptions{}
export interface IGetRecommendListResult extends Array<Recommend>{}

export interface IGetRecommendSearchListOptions {}
export interface IGetRecommendSearchListResult extends Array<RecommendSearch>{}


export interface IRecommendService {
  getRecommendList(options?: IGetRecommendListOptions): Promise<IGetRecommendListResult>;

  getRecommendSearchList(options?: IGetRecommendSearchListOptions): Promise<IGetRecommendSearchListResult>;
}