import { app, assert } from 'midway-mock/bootstrap';
import { SUCCESS } from '../../../../src/app/const-definition/status-code';
import { IHttpResponse } from '../IHttpResponse';

describe('test/app/controller/search-programme/search-programme.test.ts', () => {
  it('测试 /search-programme/get 接口', async () => {
    const query = {
      key_word: '叶',
      last_id: 0,
      num: 10,
    };
    const res: IHttpResponse = (
      await app.httpRequest().get('/search-programme/get').query(query)
    ).body;
    assert(res.status === SUCCESS, '响应码不应为' + res.status);
    assert(Array.isArray(res.data), '返回的data类型不应为' + typeof res.data);
    if (res.data.length > 0) {
      assert(
        'id' in res.data[0],
        '返回的data数组中的元素类型不应为' + JSON.stringify(res.data[0])
      );
    }
  });
});
