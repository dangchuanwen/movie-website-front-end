import { app, assert } from 'midway-mock/bootstrap';
import { SUCCESS } from '../../../../src/app/const-definition/status-code';
import { IHttpResponse } from '../IHttpResponse';

describe('test/app/controller/matched-programmes/matched-programmes.test.ts', () => {
  it('测试 /matched-programmes/get接口', async () => {
    const res: IHttpResponse = (
      await app.httpRequest().get('/matched-programmes/get').query({
        key_word: '让',
      })
    ).body;
    assert(res.status === SUCCESS, '响应码不应为' + res.status);
    assert(Array.isArray(res.data), '返回的data类型不应为' + typeof res.data);
    assert(
      'id' in res.data[0],
      '返回的data数组中的元素不应为' + JSON.stringify(res.data[0])
    );
  });
});
