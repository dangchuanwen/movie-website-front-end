import { app, assert } from 'midway-mock/bootstrap';
import { SUCCESS } from '../../../../src/app/const-definition/status-code';
import { IHttpResponse } from '../IHttpResponse';

describe('test/app/controller/hot/hot.test.ts', () => {
  it('调用 /hot/get 接口', async () => {
    const res: IHttpResponse = (await app.httpRequest().get('/hot/get')).body;
    assert(res.status === SUCCESS, '响应码不应为' + res.status);
    assert(Array.isArray(res.data), '返回数据不应为' + typeof res.data);
    assert(res.data.length > 0, '返回data长度不应为0');
    assert('id' in res.data[0], '返回data数组中的元素不存在id属性');
  });
});
