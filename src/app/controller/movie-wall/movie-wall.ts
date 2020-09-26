import { controller, provide, inject, get } from 'midway';
import { QUERY_DATA_ERROR, SUCCESS } from '../../const-definition/status-code';
import { Program } from '../../entity/Program';
import { DecoratedContext } from '../../interface/Support';
import { IGetProgramWallOptions, IProgramService } from '../../service/program/interface';
import { HttpResponse } from '../../tool/tool';

@provide()
@controller('/movie-wall')
export class MovieWallController {
  @inject()
  ctx: DecoratedContext<IGetProgramWallOptions>;

  @inject('programService')
  programService: IProgramService;

  @get('/get')
  async getProgramMovieWallData() {
    try {
      const program_wall_data: Program[] = await this.programService.getProgramWall(
        this.ctx.query
      );
      this.ctx.body = HttpResponse(program_wall_data, SUCCESS);
    } catch (err) {
      this.ctx.logger.error(err);
      this.ctx.body = HttpResponse([], QUERY_DATA_ERROR, 'there may be an error in getProgramWall function of programService.');
    }
  }
}
