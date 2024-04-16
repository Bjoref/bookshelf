import type { IBook } from "./book";

export interface IPage {
    content: IBook[],
    page: number
}
  