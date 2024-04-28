import type { IBook } from "@/types/book";
import type { IPage } from "@/types/page";

export const sliceIntoChunks = (arr: IBook[], chunkSize: number):IPage[] => {
    let page = 1;
    const res = [];
    const chunkedArray: IPage[] = [];


    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
        const pageContent: IPage = {content: chunk, page: page};
        page++
        chunkedArray.push(pageContent)
    }
    return chunkedArray
}