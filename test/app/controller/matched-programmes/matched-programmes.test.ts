import { app, assert } from 'midway-mock/bootstrap';
import { SUCCESS } from '../../../../src/app/const-definition/status-code';
import { Program } from '../../../../src/app/entity/Program';
import { IHttpResponse } from '../IHttpResponse';

describe('test/app/controller/matched-programmes/matched-programmes.test.ts', () => {
  it('测试 /matched-programmes/get接口', async () => {
    const res: IHttpResponse = (
      await app.httpRequest().get('/matched-programmes/get').send({
        key_word: '让',
      })
    ).body;
    assert(res.status === SUCCESS, '响应码不应为' + res.status);
    assert(Array.isArray(res.data), '返回的data类型不应为' + typeof res.data);
    if (res.data.length > 0) {
      assert(
        res.data[0] instanceof Program,
        '返回的data数组中的元素类型不应为' + res.data[0]
      );
    }
  });
});
