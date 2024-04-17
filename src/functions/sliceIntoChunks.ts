import type { IBook } from "@/types/book";
import type { IPage } from "@/types/page";

export const sliceIntoChunks = (arr: IBook[], chunkSize: number, chunkedArray:IPage[]): void => {
    let page = 1;
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
        const pageContent: IPage = {content: chunk, page: page};
        page++
        chunkedArray.push(pageContent)
    }
}