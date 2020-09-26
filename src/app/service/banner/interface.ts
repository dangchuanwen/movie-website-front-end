import { Banner } from '../../entity/Banner';

export interface IBannerOptions {}

export interface IBannerResult extends Array<Banner> {}

export interface IBannerService {
  getBannerList(options?: IBannerOptions): Promise<IBannerResult>;
}
