import type { IBook } from '@/types/book'
import type { IObjInSearch } from '@/types/objInSearch'
import type { IPage } from '@/types/page'

import { intoOneArray } from '@/api/intoOneArray'
import { binarySearch } from '@/api/binarySearch'


export const returnArrayAndExcludedObj = (pagesArray: IPage[], id: number): IObjInSearch => {
  const privateArray: IBook[] = intoOneArray(pagesArray)
  const excluded: IBook[] =  []
  excluded.push(privateArray[binarySearch(privateArray, id)])
  privateArray.splice(binarySearch(privateArray, id), 1)
  return { excluded, newArray: privateArray}
}