import R, {
  lens,
  view,
  set,
  over,
  juxt,
  merge,
  pick,
  pluck,
  tryCatch,
  where
} from 'ramda';

describe('lens', () => {
  it('Returns a lens for the given getter and setter functions. The getter "gets" the value of the focus; the setter "sets" the value of the focus.', () => {
    const state = { status: 'LOADED' };
    const statusLens = lens(R.prop('status'), R.assoc('status'));
    expect(view(statusLens)(state)).toBe('LOADED');
    expect(set(statusLens, 'PENDING')(state)).toEqual({ status: 'PENDING' });
    expect(over(statusLens, R.toLower)(state)).toEqual({ status: 'loaded' });
  });
});

describe('juxt', () => {
  it('juxt applies a list of functions to a list of values.', () => {
    const transformFuncs = [R.sum, R.length];
    const data = [4, 3, 6, 9];
    const getAverage = R.pipe(
      juxt(transformFuncs),
      R.apply(R.divide)
    );
    expect(getAverage(data)).toEqual(5.5);
  });
});

describe('merge', () => {
  it('Create a new object with the own properties of the first object merged with the own properties of the second object.', () => {
    const fred = merge({ name: 'fred', age: 10 }, { age: 40 });
    expect(fred).toEqual({ name: 'fred', age: 40 });
  });
});

describe('pick', () => {
  it('Returns a partial copy of an object containing only the keys specified', () => {
    const people = [
      {
        name: 'Jane',
        gender: 'F',
        age: 29
      },
      {
        name: 'Peter',
        gender: 'M',
        age: 11
      },
      {
        name: 'Brian',
        gender: 'M',
        age: 90
      }
    ];
    const pickNameAndAge = R.map(pick(['name', 'age']));
    expect(pickNameAndAge(people)).toEqual([
      { age: 29, name: 'Jane' },
      { age: 11, name: 'Peter' },
      { age: 90, name: 'Brian' }
    ]);
  });
});

describe('pluck', () => {
  it('Returns a new list by plucking the same named property off all objects in the list supplied.', () => {
    const people = [
      {
        name: 'Jane',
        gender: 'F',
        age: 29
      },
      {
        name: 'Peter',
        gender: 'M',
        age: 11
      },
      {
        name: 'Brian',
        gender: 'M',
        age: 90
      }
    ];
    const getNames = pluck('name'); // same as R.map(R.prop('name'))
    expect(getNames(people)).toEqual(['Jane', 'Peter', 'Brian']);
  });
});

describe('tryCatch', () => {
  it('try catch in functional way', () => {
    const iProbablyWillThrowError = (x) => {
      if (x) {
        return true
      }
      throw new Error('Strange Error')
    }
    const errorSafe = tryCatch(iProbablyWillThrowError, (err) => {
      console.log(err)
      return false
    })

    expect(errorSafe('hello world')).toBe(true)
    expect(errorSafe()).toBe(false)
  });
});


describe('where', () => {
  it('I want to know if specific keys values satisfy custom predicates', () => {
    const isQualified = R.pipe(
      R.prop('scores'),
      where({
        math: R.gt(R.__, 95),
        english: R.gt(R.__, 85)
       })
    )

    const john = {scores:{ math: 99, english: 77 }}
    const peter = {scores:{ math: 96, english: 90 }}
    expect(isQualified(john)).toBeFalsy()
    expect(isQualified(peter)).toBeTruthy()
  });
});
