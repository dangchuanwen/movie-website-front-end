import { History } from "../../entity/History";

export interface IGetHistoryOptions {
  token: string;
}
export interface IAddHistoryOptions {
  token: string;
  programId: number;
  watch_time_length: number;
  time_length: number;
}

export interface IHistoryResult extends Array<History> {}

export interface IHistoryService {
  getUserWatchHistory(options: IGetHistoryOptions): Promise<IHistoryResult>;

  addUserWatchHistory(options: IAddHistoryOptions): Promise<History>;
}