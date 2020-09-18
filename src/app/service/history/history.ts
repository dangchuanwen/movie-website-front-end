import { provide, inject, Context } from "midway";
import { format } from "date-fns";
import {
  IHistoryService,
  IGetHistoryOptions,
  IHistoryResult,
  IAddHistoryOptions,
} from "./interface";
import { User } from "../../entity/User";
import { Connection } from "typeorm";
import { History } from "../../entity/History";
import { IUserService } from "../user/interface";
import { IProgramService } from "../program/interface";
import { Program } from "../../entity/Program";

@provide("historyService")
export class HistoryService implements IHistoryService {
  @inject("programService")
  programService: IProgramService;

  @inject("userService")
  userService: IUserService;

  @inject()
  ctx: Context;

  @inject()
  connection: Connection;

  async getUserAllWatchHistory(
    options: IGetHistoryOptions
  ): Promise<IHistoryResult> {
    const token: string = options.token;

    const user = await this.userService.getUser({
      token,
    });
    if (typeof user === 'undefined') {
      return [];
    }

    const historyRepository = this.connection.getRepository(History);
    const userWatchHistory: History[] = await historyRepository
      .createQueryBuilder("history")
      .where('userId = :userId', { userId: user.id })
      .innerJoinAndSelect("history.program", "program")
      .getMany();

    return userWatchHistory;
  }

  async getUserWatchHistoryInLatestWeek(
    options: IGetHistoryOptions
  ): Promise<IHistoryResult> {
    const token: string = options.token;
    const user = await this.userService.getUser({
      token,
    });
    
    if (typeof user === 'undefined') {
      return [];
    }

    const historyRepository = this.connection.getRepository(History);
    const lastWeekDate = format(new Date( ( new Date().getTime() -  1000 * 60 * 60 * 24 * 7) ), "yyyy-MM-dd hh:mm:ss");
    const userWatchHistoryInLatestWeek: History[] = await historyRepository
      .createQueryBuilder("history")
      .where("history.timestamp > :lastWeekDate", { lastWeekDate })
      .andWhere("history.userId = :userId", { userId: user.id })
      .innerJoinAndSelect("history.program", "program")
      .getMany();
    return userWatchHistoryInLatestWeek;
  }

  async addUserWatchHistory(options: IAddHistoryOptions): Promise<History> {
    const token: string = options.token;
    const programId: number = options.programId;
    const watch_time_length: number = options.watch_time_length;
    const time_length: number = options.time_length;

    const program: Program = await this.programService.getOneProgram({
      id: programId,
    });
    const user: User = await this.userService.getUser({
      token,
    });

    const history: History = new History();
    history.program = program;
    history.user = user;
    history.watch_time_length = watch_time_length;
    history.time_length = time_length;

    const historyRepository = this.connection.getRepository(History);
    const saveResult: History = await historyRepository.save(history);

    return saveResult;
  }
}
