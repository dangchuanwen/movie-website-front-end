import { Context, controller, get, inject, provide } from 'midway';
import { INSERT_DATA_ERROR, SUCCESS } from '../../const-definition/status-code';
import { IUserService } from '../../service/user/interface';
import { HttpResponse } from '../../tool/tool';

@provide()
@controller('/user')
export class UserController {
  @inject()
  ctx: Context;

  @inject('userService')
  userSerive: IUserService;

  @get('/login')
  async userLogin() {
    try {
      await this.userSerive.login();
      this.ctx.body = HttpResponse({}, SUCCESS);
    } catch (err) {
      this.ctx.body = HttpResponse({}, INSERT_DATA_ERROR, 'there may an error in login funtion of userService.');
    }
  }
}
