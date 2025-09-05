export type PromiseResult<T> =
  T extends Promise<infer R> ? PromiseResult<R> : T;
