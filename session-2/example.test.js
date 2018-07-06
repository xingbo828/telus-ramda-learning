import R, {
  binary,
  bind,
  both,
  call, 
  chain,
  clamp,
  clone,
  comparator,
  complement,
  composeP,
  concat,
  cond,
  contains,
  converge,
  countBy
} from 'ramda';

describe('binary', () => {
  it('turn a fn that takes * args into a fn only takes 2 args', () => {
    const sumAll = (...args) => args.reduce((a, b) => a + b, 0);
    const sumFirstTwo = binary(sumAll);
    expect(sumFirstTwo(1, 2, 3)).toEqual(3);
    expect(sumFirstTwo(1)).toBe(NaN);
  });
});

describe('bind', () => {
  it('Creates a function that is bound to a context', () => {
    const myObj = {
      value: 'test',
      readFromThis() {
        return this.value;
      }
    };
    const myOtherObj = {
      value: 'test2'
    };
    const readFromDiffContext = bind(myObj.readFromThis, myOtherObj);
    expect(readFromDiffContext()).toBe('test2');
  });
});

describe('both', () => {
  it('takes two fns, if both pass, returns true, otherwise false ', () => {
    const bothTrue = both(R.T, R.T);
    const oneFalse = both(R.T, R.F);
    expect(bothTrue()).toBeTruthy();
    expect(oneFalse()).toBeFalsy();
  });
});

describe('call', () => {
  it('call the fn', () => {
    const fn = x => y => x + y;
    const calledFn = call(fn, 3);
    expect(calledFn(4)).toBe(7);
  });
});

describe('chain', () => {
  it('maps a function over a list and concatenates the results.', () => {
    const fn = x => [x + 1]; // 5,  [6]
    // const calledFn = call(fn, 3);
    expect(R.map(fn, [2, 3, 4])).toEqual([[3], [4], [5]]);
    expect(chain(fn, [2, 3, 4])).toEqual([3, 4, 5]);
  });
});

describe('clamp', () => {
  it('Restricts a number to be within a range.', () => {
    const min = 3;
    const max = 9;
    const rangeMinMax = clamp(min, max);
    expect(rangeMinMax(7)).toBe(7);
    expect(rangeMinMax(2)).toBe(3);
    expect(rangeMinMax(10)).toBe(9);
  });
});

describe('clone', () => {
  it('Creates a deep copy of the value', () => {
    const originalObj = { age: 17, name: { firstName: 'Bo' } };
    const clonedObj = clone(originalObj);

    expect(clonedObj).not.toBe(originalObj);
    expect(clonedObj.name.firstName).toEqual(originalObj.name.firstName);
  });
});

describe('comparator', () => {
  it('Makes a comparator function out of a function that reports whether the first element is less than the second.', () => {
    const byAge = comparator((a, b) => a.age < b.age);
    const people = [
      {
        name: 'Jane',
        age: 29
      },
      {
        name: 'Peter',
        age: 11
      },
      {
        name: 'Brian',
        age: 90
      }
    ];
    const sortByAge = R.sort(byAge);

    expect(sortByAge(people)).toEqual([
      { age: 11, name: 'Peter' },
      { age: 29, name: 'Jane' },
      { age: 90, name: 'Brian' }
    ]);
  });
});

describe('complement', () => {
  it('the opposite of fn(a)', () => {
    const isGtThan10 = x => x > 10
    const isNotGtThan10 = complement(isGtThan10)
    expect(isNotGtThan10(5)).toBeTruthy()
  });
});

describe('composeP', () => {
  it('compose fns that return promise', () => {
    const getUser = (userId) => Promise.resolve({ name: 'jane', articleId: 122 })
    const getArticle = ({ articleId }) => Promise.resolve({ title: 'the title of the article', commentId: 144 })
    const getComment = ({ commentId }) => Promise.resolve({ content: 'comment content' })
    const getCommentOfArticleOfUser = composeP(getComment, getArticle, getUser)
    expect(getCommentOfArticleOfUser(124)).resolves.toEqual({"content": "comment content"})
  });
});

describe('concat', () => {
  it('concats lists or strings', () => {
    expect(concat([2, 5], [8, 9])).toEqual([2, 5, 8, 9])
    expect(concat('ABC', 'DEF')).toEqual('ABCDEF')
  });
});

describe('cond', () => {
  it('run through a list of conditions', () => {
    // const getAnimalTypeBySound = (animal) => {
    //   const sound = animal['sound']
    //   if(sound === 'meow') {
    //     return 'cat'
    //   } else if(sound === 'woof') {
    //     return 'dog'
    //   } ...
    // }

    const getAnimalTypeBySound = cond([
      [R.pipe(R.prop('sound'), R.equals('meow')), R.always('cat')],
      [R.pipe(R.prop('sound'), R.equals('woof')), R.always('dog')],
      [R.pipe(R.prop('sound'), R.equals('moo')), R.always('cow')],
      [R.pipe(R.prop('sound'), R.equals('oink')), R.always('pig')]
    ]);
    expect(getAnimalTypeBySound({sound: 'moo'})).toBe('cow')
    expect(getAnimalTypeBySound({sound: 'woof'})).toBe('dog')
    
  });
});

describe('contains', () => {
  it('return true if value is contained in the list', () => {
    expect(contains(2, [1, 2, 3])).toBeTruthy()
    expect(contains({ name: 'jane' }, [1, {name: 'jane'}, 3])).toBeTruthy()
  });
});


describe('converge', () => {
  it('fnA, [fnB, fnC...fnN] :: (x) => fnA(fnB(x), fnC(x), ...fnN(x))', () => {
    const average = converge(R.divide, [R.sum, R.length])
    /* same as
      const average = (list) => {
        const sum = R.sum(list)
        const length = R.length(list)
        return R.divide(sum, length)
      }
    */
    expect(average([3, 5, 7, 8])).toBe(5.75)
  });
});

describe('countBy', () => {
  it('Counts the elements of a list according to how many match each value of a key generated by the supplied function', () => {
    const people = [
      { name: 'jane', age: 20 },
      { name: 'kyle', age: 30 },
      { name: 'alan', age: 20 },
      { name: 'helen', age: 40 },
      { name: 'tomas', age: 30 },
      { name: 'simpson', age: 20 },
      { name: 'royston', age: 60 },
      { name: 'harry', age: 20 }
    ];

    const countByAge = countBy(R.prop('age'))
    expect(countByAge(people)).toEqual({"20": 4, "30": 2, "40": 1, "60": 1})
  });
});

