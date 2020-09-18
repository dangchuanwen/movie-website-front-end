import { User } from "../../entity/User";

export interface IUserOptions {
  token: string;
}

export interface IUserResult extends User{}

export interface IUserService {
  getUser(options: IUserOptions): Promise<IUserResult>;
  login(): Promise<void>;
}