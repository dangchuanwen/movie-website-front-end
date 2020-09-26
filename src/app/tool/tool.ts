import * as Md5 from 'md5';

export function HttpResponse(data: object = {}, status = 0, msg = 'ok') {
  return {
    status,
    msg,
    data
  };
}

export class TokenTool {
  static gengerateToken(): string {
    const token = new Date().getTime() + Math.floor(Math.random() * 1000000);
    return Md5(String(token));
  }
}
