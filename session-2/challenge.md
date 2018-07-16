Given the user id, find out all the posts belong to the user and for each post, find out all the related comments


*** https://jsonplaceholder.typicode.com/ ***
expected output:

```js
[
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
    comments: [
      {
        id: 3,
        body: "non et atque occaecati deserunt quas accusantium unde odit nobis qui voluptatem quia voluptas consequuntur itaque dolor et qui rerum deleniti ut occaecati"
   
      },
      ...
    ]
  },
  ...
]
```