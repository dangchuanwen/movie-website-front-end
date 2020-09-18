import { Context  } from 'midway';
export interface DecoratedContext<Q> extends Context {
  ['query']: Q;
}
