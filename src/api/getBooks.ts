import type { IBook } from "@/types/book";
import type { IPage } from "@/types/page";

export const getBooks = async (searchText?:string):Promise<IBook[]> => {
    try {
        const fetchResponse = await fetch(`https://freetestapi.com/api/v1/books`);
        const response = await fetchResponse.json();
        const products: IBook[] = searchText ? response.filter((el: IBook) => el.title.toLowerCase().includes(searchText.toLowerCase())) : response

        const chunkedArray = [];

        chunkedArray.push(sliceIntoChunks(products, 10))

        return products
    } catch(error) {
        throw new Error('products response error')
    }
}

const sliceIntoChunks = (arr: IBook[], chunkSize: number): IBook[][] => {
    let pageContent: IPage;
    // let page = 1;
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}