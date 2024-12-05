import React from 'react';
import './Feed.css';

const Feed = () => {

  const posts = [
    { id: 1, author: 'John Doe', content: 'testing, this test, test test' },
    { id: 2, author: 'Jane Smith', content: 'please work , test,test,test' },
    { id: 3, author: 'Bob Johnson', content: 'test 3, test 3, test 333. testtest' },
    { id: 4, author: 'jimbo', content: 'yet another test to cover more space' },
    { id: 5, author: 'jimbos brother', content: 'yet another test to cover more space' },
    { id: 6, author: 'John', content: 'yet another test to cover more space' },
    { id: 7, author: 'Anon number1', content: 'yet another test to cover more space' },
    { id: 8, author: 'Anon number2', content: 'yet another test to cover more space' },
    { id: 9, author: 'Anon number3', content: 'yet another test to cover more space' },
    { id: 10, author: 'Anon number4', content: 'yet another test to cover more space' },
  ];

  return (
    <div className="main-feed">
      <h2>Feed</h2>
      <button className="create-post">Create Post</button>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.author}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
