import R, {
  defaultTo,
  difference,
  differenceWith,
  dissoc,
  dissocPath,
  drop,
  either,
  empty,
  eqBy,
  eqProps,
  equals,
  evolve
} from 'ramda';

describe('defaultTo', () => {
  it('Returns the second argument if it is not null, undefined or NaN; otherwise the first argument is returned.', () => {
    const getUser = (username) => username

    const failSafeGetUser = R.pipe(getUser, defaultTo('bo'))

    expect(failSafeGetUser('tom')).toBe('tom')
    expect(failSafeGetUser()).toBe('bo')
  });
});

describe('difference', () => {
  it(`Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
     Objects and Arrays are compared in terms of value equality, not reference equality.`, () => {
    expect(difference([1,2,3,4], [7,6,5,4,3])).toEqual([1, 2])

    const groupA = [{ name: 'bo' }, { name: 'brian'}]
    const groupB = [{ name: 'brian'}, { name: 'tom' }]
    expect(difference(groupA, groupB)).toEqual([{"name": "bo"}])
  });
});

describe('differenceWith', () => {
  it(`Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list. 
  Duplication is determined according to the value returned by applying the supplied predicate to two list elements.`, () => {
    const groupA = [{ name: 'bo', age: 44 }, { name: 'brian'}]
    const groupB = [{ name: 'brian'}, { name: 'bo' }]

    const cmp = (x, y) => x.name === y.name

    expect(differenceWith(cmp)(groupA, groupB)).toEqual([])
  });
});

describe('dissoc', () => {
  it('Returns a new object that does not contain a prop property.', () => {
    const user = { name: 'Tom', age: 88 }
    expect(dissoc('age', user)).toEqual({name: 'Tom'})
  });
});

describe('dissocPath', () => {
  it('Makes a shallow clone of an object, omitting the property at the given path', () => {
    const user = {
      name: 'Bo',
      profession: {
        major: 'IT',
        minor: 'Chef'
      }
    }

    const userWithoutMinorProfession = dissocPath(['profession', 'minor'])
    expect(userWithoutMinorProfession(user)).toEqual({
      name: 'Bo',
      profession: {
        major: 'IT'
      }
    })
  });
});

describe('drop', () => {
  it('Returns all but the first n elements of the given list, string', () => {
    expect(drop(2, [1,2,3])).toEqual([3])
    expect(drop(2, 'Ramda')).toEqual('mda')
  });
});




describe('either', () => {
  it('|| operator', () => {
    const bo = {
      age: 44, gender: 'male'
    }
    const jane = {
      age: 29, gender: 'female'
    }
    const rachel = {
      age: 19, gender: 'female'
    }


    const isMale = R.propEq('gender', 'male')
    const isOrderThan20 = R.pipe(R.prop('age'), R.gte(R.__, 20))
    const eitherMaleOrOrderThan20 = either(isMale, isOrderThan20)
    expect(eitherMaleOrOrderThan20(bo)).toBeTruthy()
    expect(eitherMaleOrOrderThan20(jane)).toBeTruthy()
    expect(eitherMaleOrOrderThan20(rachel)).toBeFalsy()
  });
});

describe('empty', () => {
  it('return the empty value of its argument type', () => {
    expect(empty('abc')).toBe('')
    expect(empty(['a', 'b'])).toEqual([])
    expect(empty({ name: 'bo'})).toEqual({})
  });
});

describe('eqBy', () => {
  it('Takes a function and two values in its domain and returns true if the values map to the same value in the codomain', () => {
    const userA = { name: 'Bo', userName: 'user-xxx' }
    const userB = { name: 'Tom', userName: 'user-xxx' }
    expect(eqBy(Math.abs, 5, -5)).toBeTruthy()
    expect(eqBy(R.prop('userName'))(userA, userB)).toBeTruthy()
  });
});

describe('eqProps', () => {
  it('Reports whether two objects have the same value', () => {
    const userA = { name: 'Bo', userName: 'user-xxx' }
    const userB = { name: 'Tom', userName: 'user-xxx' }
    expect(eqProps('userName')(userA, userB)).toBeTruthy()
    expect(eqProps('name')(userA, userB)).toBeFalsy()
  });
});

describe('equals', () => {
  it('Returns true if its arguments are equivalent, false otherwise. Handles cyclical data structures.', () => {
    const userA = { name: 'Bo', userName: 'user-xxx' }
    const userB = { name: 'Tom', userName: 'user-xxx' }
    const userC = { name: 'Tom', userName: 'user-xxx' }
    expect(equals(userA, userB)).toBeFalsy()
    expect(equals(userC, userB)).toBeTruthy()
  });
});

describe('evolve', () => {
  it('Creates a new object by recursively evolving a shallow copy of object', () => {
    // VERY USEFUL
    const user = {
      name: 'bo',
      detail:{
        age: 39,
        gender: ' male '
      },
      id: 'x679443df',
    }
    const transform = {
      name: R.toUpper,
      detail: {
        age: R.inc,
        gender: R.pipe(R.trim, R.toUpper)
      }
    }
    expect(evolve(transform)(user)).toEqual({
      name: 'BO',
      id: 'x679443df',
      detail: {
        age: 40,
        gender: 'MALE'
      }
    })
  });
});






