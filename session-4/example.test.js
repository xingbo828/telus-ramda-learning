import R, {
  flatten,
  flip,
  groupBy,
  identical,
  ifElse,
  insert,
  intersection,
  intersperse,
  invoker,
  is,
  isEmpty,
  isNil
} from 'ramda';

describe('flatten', () => {
  it('Returns a new list by pulling every item out of it (and all its sub-arrays) and putting them in a new array, depth-first.', () => {
    const flattenResult = flatten([
      1,
      2,
      [3, 4],
      5,
      [6, [7, 8, [9, [10, 11], 12]]]
    ]);
    expect(flattenResult).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
});

describe('flip', () => {
  it('Returns a new function much like the supplied one, except that the first two arguments order is reversed.', () => {
    expect(R.divide(10, 5)).toBe(2);
    const reversedDivide = flip(R.divide);
    expect(reversedDivide(10, 5)).toBe(0.5);
  });
});

// very useful
describe('groupBy', () => {
  it('Splits a list into sub-lists stored in an object, based on the result of calling a String-returning function on each element, and grouping the results according to values returned.', () => {
    const phones = [
      {
        name: 'iPhone 6',
        screenSize: '5.2',
        os: 'ios'
      },
      {
        name: 'iPhone 6 plus',
        screenSize: '5.9',
        os: 'ios'
      },
      {
        name: 'Samsung Galaxy 9',
        screenSize: '5.9',
        os: 'android'
      },
      {
        name: 'HuaWei P9',
        screenSize: '5.2',
        os: 'android'
      }
    ];

    const groupByOs = groupBy(R.prop('os'));
    expect(groupByOs(phones)).toEqual({
      android: [
        { name: 'Samsung Galaxy 9', os: 'android', screenSize: '5.9' },
        { name: 'HuaWei P9', os: 'android', screenSize: '5.2' }
      ],
      ios: [
        { name: 'iPhone 6', os: 'ios', screenSize: '5.2' },
        { name: 'iPhone 6 plus', os: 'ios', screenSize: '5.9' }
      ]
    });

    const groupByScreenSize = groupBy(R.prop('screenSize'));
    expect(groupByScreenSize(phones)).toEqual({
      '5.2': [
        { name: 'iPhone 6', os: 'ios', screenSize: '5.2' },
        { name: 'HuaWei P9', os: 'android', screenSize: '5.2' }
      ],
      '5.9': [
        { name: 'iPhone 6 plus', os: 'ios', screenSize: '5.9' },
        { name: 'Samsung Galaxy 9', os: 'android', screenSize: '5.9' }
      ]
    });
  });
});

describe('identical', () => {
  it('Returns true if its arguments are identical, false otherwise. Values are identical if they reference the same memory', () => {
    const a = {};
    const b = {};
    expect(identical(a, b)).toBeFalsy();
    expect(identical(a, a)).toBeTruthy();
    expect(identical(1, 1)).toBeTruthy();
  });
});

describe('ifElse', () => {
  it('Creates a function that will process either the onTrue or the onFalse function depending upon the result of the condition predicate.', () => {
    const cars = [
      {
        model: 'Audi A3',
        year: 2017,
        price: 50000
      },
      {
        model: 'Audi A6',
        year: 2018,
        price: 60000
      }
    ];

    const discountIfMadeLast2017 = ifElse(
      R.propEq('year', 2017),
      R.evolve({ price: R.subtract(R.__, 1000) }),
      R.identity
    );

    expect(R.map(discountIfMadeLast2017)(cars)).toEqual([
      { model: 'Audi A3', price: 49000, year: 2017 },
      { model: 'Audi A6', price: 60000, year: 2018 }
    ]);
  });
});

describe('insert', () => {
  it('Inserts the supplied element into the list, at the specified index', () => {
    expect(insert(2, 'x', [1,2,3,4])).toEqual([1, 2, "x", 3, 4])
  });
});

describe('intersection', () => {
  it('Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.', () => {
    expect(intersection([1,2,3,4], [7,6,5,4,3])).toEqual([3, 4])
  });
});

describe('intersperse', () => {
  it('Creates a new list with the separator interposed between elements.', () => {
    const types = ['a', 'b', 'c']
    expect(intersperse(' | ')(types)).toEqual(["a", " | ", "b", " | ", "c"])
  });
});

describe('invoker', () => {
  it('Turns a named method with a specified arity into a function that can be called directly supplied with arguments and a target object.', () => {
    const test = invoker(0, 'toUpperCase')
    expect(test('test')).toEqual('TEST')

    /*
      const links = document.querySelectorAll('a')
      links.forEach(link => link.style = {color: 'red'})
    */

    const querySelectorAll = invoker(1, 'querySelectorAll')
    const setStyle = R.assoc('style')

    const updateLinksStyle = R.pipe(
      querySelectorAll('a'),
      R.map(setStyle({ color: 'red'}))
    )
    updateLinksStyle(document)
  });
});

describe('is', () => {
  it('See if an object (val) is an instance of the supplied constructor. ', () => {
    const isObject = is(Object)
    const isArray = is(Array)
    class Person {};
    const isPerson = is(Person)
    expect(isObject({})).toBeTruthy()
    expect(isArray([1, 2, 3])).toBeTruthy()
    expect(isPerson(new Person())).toBeTruthy()
  });
});

describe('isEmpty', () => {
  it('Returns true if the given value is its types empty value; false otherwise.', () => {
    expect(isEmpty([])).toBeTruthy()
    expect(isEmpty({})).toBeTruthy()
    expect(isEmpty('')).toBeTruthy()
    expect(isEmpty(null)).toBeFalsy()
    expect(isEmpty([1, 2, 3])).toBeFalsy()
  });
});

describe('isNil', () => {
  it('Checks if the input value is null or undefined.', () => {
    expect(isNil()).toBeTruthy()
    expect(isNil(null)).toBeTruthy()
    expect(isNil(undefined)).toBeTruthy()
  });
});
