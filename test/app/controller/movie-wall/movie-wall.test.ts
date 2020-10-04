import { app, assert } from 'midway-mock/bootstrap';
import { IHttpResponse } from '../IHttpResponse';
import { SUCCESS } from '../../../../src/app/const-definition/status-code';
import { IGetProgramWallOptions } from '../../../../src/app/service/program/interface';

describe('test/app/controller/movie-wall/movie-wall.test.ts', () => {
  it('调用 /movie-wall/get', async () => {
    const params: IGetProgramWallOptions = {
      program_type: '',
      program_classification: '',
      realease_year: '',
      program_area: '',
      last_id: '',
      count: '',
    };
    const res: IHttpResponse = (
      await app.httpRequest().get('/movie-wall/get').query(params)
    ).body;

    assert(res.status === SUCCESS, '响应码不应为' + res.status);
    assert(Array.isArray(res.data), '返回数据不应为' + typeof res.data);
    assert(res.data.length > 0, '返回data长度不应为0');
    assert('id' in res.data[0], '返回data数组中的元素不存在id属性');
  });
});
