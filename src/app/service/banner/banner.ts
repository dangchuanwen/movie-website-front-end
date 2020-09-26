import { provide, inject, Context } from 'midway';
import { IBannerService, IBannerResult } from './interface';
import { Connection } from 'typeorm';
import { Banner } from '../../entity/Banner';

@provide('bannerService')
export class BannerService implements IBannerService {
  @inject()
  ctx: Context;

  @inject()
  connection: Connection;

  async getBannerList(): Promise<IBannerResult> {
    const bannerRepository = this.connection.getRepository(Banner);
    const bannerList: Banner[] = await bannerRepository
      .createQueryBuilder('banner')
      .innerJoinAndSelect('banner.program', 'program')
      .getMany();
    return bannerList;
  }
}
