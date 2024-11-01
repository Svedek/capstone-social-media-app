import React from 'react';

const Feed = ({ posts }) => {
  return (
    <div className="main-feed">
      <h2>Your feed</h2>
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
