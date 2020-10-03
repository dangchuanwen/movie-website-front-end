import { app, assert } from 'midway-mock/bootstrap';
import { SUCCESS } from '../../../../src/app/const-definition/status-code';
import { IHttpResponse } from '../IHttpResponse';

describe('test/app/controller/history/history.test.ts', () => {
  it('调用 /history/in-latest-week/get 接口', async () => {
    const res: IHttpResponse = (
      await app
        .httpRequest()
        .get('/history/in-latest-week/get')
        .set('Cookie', ['token=e80e56afe6d6967bde8980590235ee47'])
    ).body;
    assert(res.status === SUCCESS, '响应码不应为' + res.status);
    assert(Array.isArray(res.data), '返回的数据类型不应为' + typeof res.data);
  });

  it('调用 /history/all/get 接口', async () => {
    const res: IHttpResponse = (
      await app
        .httpRequest()
        .get('/history/all/get')
        .set('Cookie', ['token=e80e56afe6d6967bde8980590235ee47'])
    ).body;
    assert(res.status === SUCCESS, '响应码不应为' + res.status);
    assert(Array.isArray(res.data), '返回的data类型不应为' + typeof res.data);
    if (res.data.length > 0) {
      assert(
        res.data[0] instanceof History,
        '返回的data数组中的元素类型不应为' + res.data[0]
      );
    }
  });
});
