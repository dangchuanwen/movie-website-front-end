import { provide, inject, Context } from 'midway';
import { Connection } from 'typeorm';
import { IHotService, IHotResult } from './interface';
import { Hot } from '../../entity/Hot';

@provide('hotService')
export class HotService implements IHotService {
  @inject()
  ctx: Context;

  @inject()
  connection: Connection;

  async getHotList(): Promise<IHotResult> {
    const hotRepository = this.connection.getRepository(Hot);
    const hotList: Hot[] = await hotRepository
      .createQueryBuilder('hot')
      .innerJoinAndSelect('hot.program', 'program')
      .getMany();
    return hotList;
  }
}
