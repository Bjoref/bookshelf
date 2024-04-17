import type { IBook } from "@/types/book";
import type { IPage } from "@/types/page";

export const getBooks = async (searchText?:string):Promise<IPage[]> => {
    try {
        const fetchResponse = await fetch(`https://freetestapi.com/api/v1/books`);
        const response = await fetchResponse.json();
        const products: IBook[] = searchText ? response.filter((el: IBook) => el.title.toLowerCase().includes(searchText.toLowerCase())) : response

        const chunkedArray: IPage[] = [];

        sliceIntoChunks(products, 10, chunkedArray);

        return chunkedArray
    } catch(error) {
        throw new Error('products response error')
    }
}

const sliceIntoChunks = (arr: IBook[], chunkSize: number, chunkedArray:IPage[]): void => {
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