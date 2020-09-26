import { app, assert } from 'midway-mock/bootstrap';
import { IHttpResponse } from '../IHttpResponse';
import { SUCCESS } from '../../../../src/app/const-definition/status-code';

describe('test/controller/home/home.test.ts', () => {
  it('测试 /home 接口', async () => {
    const res: IHttpResponse = (await app.httpRequest().get('/')).body;
    assert(res.status === SUCCESS && typeof res.data === 'object');
  });
});
