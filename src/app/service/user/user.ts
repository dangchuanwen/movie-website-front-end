import { IUserService, IUserResult, IUserOptions } from "./interface";
import { provide, inject, Context } from "midway";
import { Connection } from "typeorm";
import { User } from "../../entity/User";

@provide("userService")
export class UserService implements IUserService {
  @inject()
  ctx: Context;

  @inject()
  connection: Connection;

  async getUser(options: IUserOptions): Promise<IUserResult> {
    try {
      const token = options.token;
      const userRepository = this.connection.getRepository(User);
      const user: User = await userRepository.findOne({
        token
      });
      return user;
    } catch(err) {
      this.ctx.logger.error(err);
      return null;
    }

  }
}