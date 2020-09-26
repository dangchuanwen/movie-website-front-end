interface MyObject {
  length: number;
}

export interface IHttpResponse {
  status: number;
  msg: string;
  data: object[] | MyObject;
}
