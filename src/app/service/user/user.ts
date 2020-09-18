import { IUserService, IUserResult, IUserOptions } from "./interface";
import { provide, inject, Context } from "midway";
import { Connection } from "typeorm";
import { User } from "../../entity/User";
import { TokenTool } from "../../tool/tool";

@provide("userService")
export class UserService implements IUserService {
  @inject()
  ctx: Context;

  @inject()
  connection: Connection;

  async getUser(options: IUserOptions): Promise<IUserResult> {
    const token = options.token;
    const userRepository = this.connection.getRepository(User);
    const user: User = await userRepository.findOne({
      token,
    });
    return user;
  }

  async login(): Promise<void> {
    let token = this.ctx.cookies.get("token");
    if (!token) {
      token = TokenTool.gengerateToken();
      const user = new User();
      user.token = token;
      const userRepository = this.connection.getRepository(User);
      await userRepository.save(user);
    }

    const currentTime = new Date().getTime();
    const expirationTime = currentTime + 60 * 1000 * 60 * 24 * 30;

    this.ctx.cookies.set("token", token, {
      httpOnly: true,
      expires: new Date(expirationTime)
    });
  }
}
