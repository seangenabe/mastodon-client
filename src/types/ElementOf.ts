export type ElementOf<T> = T extends Iterable<infer E> ? E
  : T extends AsyncIterable<infer F> ? F
  : never;
