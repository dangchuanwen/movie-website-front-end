import { app, assert } from 'midway-mock/bootstrap';
import { IHttpResponse } from '../IHttpResponse';
import { SUCCESS } from '../../../../src/app/const-definition/status-code';
describe('test/app/controller/recommend-search/recommend-search.test.ts', () => {
  it('测试 /recommend-search/get接口', async () => {
    const res: IHttpResponse = (
      await app.httpRequest().get('/recommend-search/get')
    ).body;
    assert(res.status === SUCCESS, '响应码不应为' + res.status);
    assert(Array.isArray(res.data), '返回数据不应为' + typeof res.data);
    if (res.data.length > 0) {
      assert('id' in res.data[0], '返回的data数组中的元素不存在id属性');
    }
  });
});
