import { provide, inject, Context } from "midway";
import { IHistoryService, IGetHistoryOptions, IHistoryResult, IAddHistoryOptions } from "./interface";
import { User } from "../../entity/User";
import { Connection } from "typeorm";
import { History } from "../../entity/History";
import { IUserService } from "../user/interface";
import { IProgramService } from "../program/interface";
import { Program } from "../../entity/Program";

@provide("historyService")
export class HistoryService implements IHistoryService {
  @inject('programService')
  programService: IProgramService;

  @inject('userService')
  userService: IUserService;

  @inject()
  ctx: Context;

  @inject()
  connection: Connection;

  async getUserWatchHistory(options: IGetHistoryOptions): Promise<IHistoryResult> {
    try {
      const token: string = options.token;
      const user = await this.userService.getUser({
        token
      });
      const historyRepository = this.connection.getRepository(History);
      const userWatchHistory: History[] = await historyRepository.find({
        user
      });
      return userWatchHistory;
    } catch(err) {
      this.ctx.logger.error(err);
      return [];
    }

  }

  async addUserWatchHistory(options: IAddHistoryOptions): Promise<History> {
    try {
      const token: string = options.token;
      const programId: number = options.programId;
      const watch_time_length: number = options.watch_time_length;
      const time_length: number = options.time_length;

      const program: Program = await this.programService.getProgram({
        id: programId
      });
      const user: User = await this.userService.getUser({
        token
      });

      const history: History = new History();
      history.program = program;
      history.user = user;
      history.watch_time_length = watch_time_length;
      history.time_length = time_length;

      const historyRepository = this.connection.getRepository(History);
      const saveResult: History = await historyRepository.save(history);

      return saveResult;
    } catch(err) {
      this.ctx.logger.error(err);
      return null;
    }
  }
}