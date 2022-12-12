import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useDatabase } from "../DatabaseContext";

const Home = () => {
  const { getElementsFromDoc } = useDatabase();
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { currentUser } = useAuth();

  const getPosts = async () => {
    const response = await getElementsFromDoc();
    setIsFetching(false);
    setPosts(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    setIsFetching(true);
    getPosts();
  }, []);

  return (
    <div className="home-container">
      {currentUser.isSignedIn ? (
        <NavLink to={"/account"}>Konto</NavLink>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}

      <h1>Posts</h1>
      <ul className="feed-list">
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          posts.map((post) => {
            return (
              <li className="feed-item" key={post.id}>
                <h2>{post.author}</h2>
                <span>{post.date}</span>
                <span>{post.title}</span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Home;
