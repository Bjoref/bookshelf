import type { IBook } from "./book";

export interface IObjInSearch {
    excluded: IBook[],
    newArray: IBook[]
}
  