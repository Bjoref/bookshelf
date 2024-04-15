import type { IBook } from "@/types/book";

export const getBooks = async (searchText?:string):Promise<IBook[]> => {
    try {
        const fetchResponse = await fetch(`https://freetestapi.com/api/v1/books`);
        const response = await fetchResponse.json();
        const products: IBook[] = searchText ? response.filter((el: IBook) => el.title.toLowerCase().includes(searchText.toLowerCase())) : response

        return products
    } catch(error) {
        throw new Error('products response error')
    }
}