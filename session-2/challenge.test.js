import fetch from 'node-fetch';
import R, {
  take,
  pipeP,
  pipe,
  assoc,
  map,
  pick,
  bind,
} from 'ramda';


describe('session 2 challenge solution', () => {
  it('', async () => {
    const fetchPostsByUserId = (userId) => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(res => res.json())
    const fetchCommetsByPostId = ({ id }) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(res => res.json())

    const attachCommentsToPost =  (post) => {
      return pipeP(
        fetchCommetsByPostId,
        pipe(
          map(pick(['name', 'email', 'body'])),
          assoc('comments', R.__, post)
        )
      )(post)
    };

    const processPosts = pipe(map(attachCommentsToPost), bind(Promise.all, Promise))

    const getDetail = pipeP(
      fetchPostsByUserId, 
      take(1), 
      processPosts
    )
    const result = await getDetail(1);
    // log(result)
    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
    expect(result[0].comments.length).toEqual(5)
  })
})