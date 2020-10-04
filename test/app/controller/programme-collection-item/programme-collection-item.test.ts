import { app, assert } from 'midway-mock/bootstrap';
import { SUCCESS } from '../../../../src/app/const-definition/status-code';
import { IHttpResponse } from '../IHttpResponse';
describe('test/app/controller/programme-collection-item/programme-collection-item.test.ts', () => {
  it('测试 /programme-collection-item/get接口', async () => {
    const query = {
      name: '庆余年',
      order: 1,
    };
    const res: IHttpResponse = (
      await app.httpRequest().get('/programme-collection-item/get').query(query)
    ).body;
    assert(res.status === SUCCESS, '响应码不应为' + res.status);
    assert('id' in res.data, '返回的data不应为' + JSON.stringify(res.data));
  });
});
