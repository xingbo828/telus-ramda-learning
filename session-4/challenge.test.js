import fetch from 'node-fetch'

import R, {
  pipeP,
  pipe,
  prop,
  lte,
  gt,
  both,
  cond,
  ifElse,
  identity,
  isNil,
  always,
  evolve,
  map,
  assoc,
  converge,
  groupBy,
  T,
} from 'ramda';

describe('Session 4 challenge', () => {
  it('', async () => {
    const getMovies = () => fetch('https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json').then(res => res.json())

    const tagUnknowGenre = evolve({
      Major_Genre: ifElse(
        isNil,
        always('Unknown'),
        identity
      )
    })

    const attachReview = converge(assoc, [always('review'), pipe(prop('IMDB_Rating'), cond([
        [isNil, always('UNKNOWN RATING')],
        [lte(R.__, 1), always('Ridiculous')],
        [both(gt(R.__, 1), lte(R.__, 2)), always('Awful')],
        [both(gt(R.__, 2), lte(R.__, 3)), always('Bad')],
        [both(gt(R.__, 3), lte(R.__, 4)), always('ehh')],
        [both(gt(R.__, 4), lte(R.__, 5)), always('Average')],
        [both(gt(R.__, 5), lte(R.__, 6)), always('Good')],
        [both(gt(R.__, 6), lte(R.__, 7)), always('Good +')],
        [both(gt(R.__, 7), lte(R.__, 8)), always('Very Good')],
        [both(gt(R.__, 8), lte(R.__, 9)), always('Excellent')],
        [both(gt(R.__, 9), lte(R.__, 10)), always('Amazing')]
      ])), identity])



    const formatMovies = pipe(
      map(pipe(tagUnknowGenre, attachReview)),
      groupBy(prop('Major_Genre'))
    )

    const fetchMovies = pipeP(
      getMovies,
      formatMovies
    )

    const result = await fetchMovies();
    log(result)
  });
});