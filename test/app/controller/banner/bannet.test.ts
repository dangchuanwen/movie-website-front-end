import { app, assert } from 'midway-mock/bootstrap';
import { SUCCESS } from '../../../../src/app/const-definition/status-code';
import { IHttpResponse } from '../IHttpResponse';

describe('test/app/controller/banner/bannet.test.ts', () => {
  it('调用 /banner/get 接口', async () => {
    const res: IHttpResponse = (await app.httpRequest().get('/banner/get')).body;
    assert(res.status === SUCCESS, '响应码不应该为' + res.status);
    assert(Array.isArray(res.data), '返回数据类型不应该为' + typeof res.data);
    assert(res.data.length > 0, '返回的data的长度不应该为' + res.data.length);
    assert('id' in res.data[0], '返回的data数组中元素不存在id属性');
  });
});
