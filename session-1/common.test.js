import R, {
  path,
  prop,
  pipe,
  compose,
  curry,
  map,
  filter
} from 'ramda'

describe('curry', () => {
  it('turns function into curry function', () => {
    const add = (a, b, c) => a + b + c
    const curryAdd = curry(add)
    expect(curryAdd(1)(2)(3)).toEqual(6)
  })
})

describe('prop', () => {
  it('access prop of object', () => {
    const input = { name: 'jane' }
    expect(prop('name')(input)).toEqual('jane')
  })
})

describe('path', () => {
  it('access prop of object on a given path', () => {
    const input = { name: 'jane', detail: { age: 13 } }
    expect(path(['detail', 'age'])(input)).toEqual(13)
  })
})

describe('map', () => {
  it('map a function to a functor', () => {
    const input = [1, 2, 3]
    expect(map(R.inc, input)).toEqual([2, 3, 4])
  })
})

describe('filter', () => {
  it('filter through a Filterable(Iteratable) object', () => {
    const input = [ 5, 8, 99, 104 ]
    expect(filter(R.gt(R.__, 6), input)).toEqual([8, 99, 104])
  })
})


describe('compose and pipe', () => {
  it('pass data to a list of functions as a pipeline', () => {
    const input = { name: ' jane' }
    const processWithPipe = pipe(prop('name'), R.trim, R.toUpper)
    const processWithCompose = compose(R.toUpper, R.trim, prop('name'))
    expect(processWithPipe(input)).toEqual("JANE")
    expect(processWithCompose(input)).toEqual("JANE")
  })
})