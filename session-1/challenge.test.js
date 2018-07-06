import {
  filter,
  propEq,
  sort,
  ascend,
  prop,
  pipe,
  take,
  pluck,
  applySpec,
  sum,
  trim,
  map
} from 'ramda';

import data from './data.json';

describe('challenge solution', () => {
  it('', () => {
    const onlyBooks = filter(propEq('category', 'book'))
    const sortByPrice = sort(ascend(prop('price')))
    const first3 = take(3)
    // const transform = applySpec({
    //   books: pipe(pluck('name'), map(trim)),
    //   total: pipe(pluck('price'), sum)
    // })
    pipe(onlyBooks, sortByPrice, first3, transform)(data)
  })
})

