import { Context, controller, get, inject, provide } from 'midway';
import { SUCCESS } from '../../const-definition/status-code';
import { HttpResponse } from '../../tool/tool';

@provide()
@controller('/')
export class HomeController {
  @inject()
  ctx: Context;

  @get('/')
  async index() {
    this.ctx.body = HttpResponse({name: 'dcw'}, SUCCESS);
  }
}
