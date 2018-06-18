import R, {
  add,
  adjust,
  all,
  allPass,
  addIndex,
  ap,
  aperture,
  apply,
  applySpec,
  assoc,
  assocPath
} from 'ramda';

describe('add', () => {
  it('adds two number', () => {
    expect(add(1, 2)).toEqual(3);
  });

  it('returns curry function', () => {
    const add3 = add(3);
    expect(add3(7)).toEqual(10);
  });
});

describe('adjust', () => {
  it('can adjust a fixed position', () => {
    const incrementPositionValue = (pos, list) => adjust(add(1), pos, list);
    expect(incrementPositionValue(3, [1, 2, 3, 4])[3]).toEqual(5);
  });
});

describe('all', () => {
  it('all users passes test', () => {
    const allOlderThan18 = all(p => p.age > 18);
    const users = [
      {
        name: 'john',
        age: 32
      },
      {
        name: 'lily',
        age: 19
      }
    ];
    expect(allOlderThan18(users)).toBeTruthy();
  });
});

describe('allPass', () => {
  it('all users passes test', () => {
    const allOlderThan18 = all(p => p.age > 18);
    const allMale = all(p => p.gendar === 'male');

    const users = [
      {
        name: 'john',
        gendar: 'male',
        age: 32
      },
      {
        name: 'lily',
        gendar: 'female',
        age: 19
      }
    ];

    const allMaleOlderThan18 = allPass([allOlderThan18, allMale]);
    expect(allMaleOlderThan18(users)).toBeFalsy();
  });
});

describe('all', () => {
  it('all users passes test', () => {
    const allOlderThan18 = all(p => p.age > 18);
    const users = [
      {
        name: 'john',
        age: 32
      },
      {
        name: 'lily',
        age: 19
      }
    ];
    expect(allOlderThan18(users)).toBeTruthy();
  });
});

describe('addIndex', () => {
  it('it adds index to iterator function', () => {
    const double = (x, index) => x * index;
    const input = [10, 20, 30, 40];
    const mapWithIndex = addIndex(R.map);
    expect(mapWithIndex(double, input)).toEqual([0, 20, 60, 120]);
  });
});

describe('ap', () => {
  it('applies a list of fns to a list of values', () => {
    const input = ['a', 'b', 'c'];
    const fns = [a => a.toUpperCase(), a => a.toLowerCase()];
    expect(ap(fns, input)).toEqual(['A', 'B', 'C', 'a', 'b', 'c']);
  });
});

describe('aperture', () => {
  it('returns a new list, composed of n-tuples of consecutive elements', () => {
    const input = ['a', 'b', 'c', 'd', 'e'];
    expect(aperture(2, input)).toEqual([
      ['a', 'b'],
      ['b', 'c'],
      ['c', 'd'],
      ['d', 'e']
    ]);
  });
});

describe('apply', () => {
  it('applies function fn to the argument list args', () => {
    const sumAll = (...args) => args.reduce((a, b) => a + b, 0);
    const input = [1, 2, 3, 4, 5];
    expect(apply(sumAll, input)).toEqual(15);
  });
});

// important
describe('applySpec', () => {
  it('recursively mapping properties to functions', () => {
    const sumAll = (...args) => args.reduce((a, b) => a + b, 0);
    const max = apply(Math.max);
    const input = [4, 21, 99, 107, 55];
    const schema = {
      total: apply(sumAll), // R.sum
      max: apply(Math.max), // R.max
      count: R.length,
      average: R.pipe(
        R.juxt([R.sum, R.length]),
        apply(R.divide)
      ) // R.mean
    };
    // note: nest also works
    const getSpecs = applySpec(schema);
    expect(getSpecs(input)).toEqual({
      max: 107,
      total: 286,
      average: 57.2,
      count: 5
    });
  });
});

describe('assoc', () => {
  it('creates clone of object and overrides properties', () => {
    const input = { name: 'jane', age: 39 }
    expect(assoc('age', 40, input)).toEqual({"age": 40, "name": "jane"});
  });
});

describe('assocPath', () => {
  it('creates clone of object and overrides properties on a given path', () => {
    const input = { name: 'jane', detail: { age: 39 } }
    expect(assocPath(['detail', 'age'], 40, input)).toEqual({"detail": {"age": 40}, "name": "jane"});
  });
});
