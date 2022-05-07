import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import "./Feed.css";

import { CircularProgress } from "@mui/material";
const Home = () => {
  const [posts, setPosts] = useState(null);

  // fetching posts
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          })
        );
      });
  }, []);

  return (
    <div className="home">
      <NewPost />
      {posts ? (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              authorName={post.authorName}
              authorEmail={post.authorEmail}
              authorPic={post.authorPic}
              title={post.title}
              imgUrl={post.imgUrl}
              message={post.message}
              likes={post.likes}
              comments={post.comments}
              timestamp={post.timestamp}
              refEmail={post.refEmail}
            />
          ))}
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Home;
