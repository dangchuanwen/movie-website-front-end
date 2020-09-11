import { Hot } from "../../entity/Hot";

export interface IHotOptions {}

export interface IHotResult extends Array<Hot>{}

export interface IHotService {
  getHotList(options?: IHotOptions): Promise<IHotResult>;
}