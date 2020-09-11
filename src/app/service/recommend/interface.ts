import { Recommend } from "../../entity/Recommend";

export interface IRecommendOptions{}

export interface IRecommendResult extends Array<Recommend>{}

export interface IRecommendService {
  getRecommendList(options?: IRecommendOptions): Promise<IRecommendResult>;
}