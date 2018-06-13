import { ap, multiply, add, concat, toUpper } from 'ramda'

describe('AP', () => {
  it('apply Multiple and Add', () => {
    const input = [1, 2, 3]
  })

  it('apply two functions as S combinator', () => {
    const word = "boxing"
    expect(ap(concat, toUpper)(word)).toEqual('boxingBOXING')
  })
})
