import type { IBook } from "@/types/book";
import type { IPage } from "@/types/page";
import { sliceIntoChunks } from "@/functions/sliceIntoChunks";
import { newBookList } from '@/stores/currentBookList'

export const getBooks = async (searchText?:string):Promise<IPage[]> => {
    const bookList = newBookList();
    try {
        const fetchResponse = await fetch(`https://freetestapi.com/api/v1/books`);
        const response = await fetchResponse.json();
        const products: IBook[] = searchText ? response.filter((el: IBook) => el.title.toLowerCase().includes(searchText.toLowerCase())) : response
        bookList.allBooks = products
        const chunkedArray: IPage[] = sliceIntoChunks(products, 10);

        return chunkedArray
    } catch(error) {
        throw new Error('products response error')
    }
}
