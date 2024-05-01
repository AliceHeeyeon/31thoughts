import { useState, useEffect } from "react"
import axios from 'axios'
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const baseUrl = import.meta.env.VITE_BASEURL;

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const postEndPoint = `${baseUrl}/posts`;
      axios.get(postEndPoint)
          .then((response) => {
              setPosts(response.data);
          })
          .catch((error) => {
              console.error("Error fetching posts:", error);
          });
  }, []);

  return (
    <div className="home">
        <div className="hero">
            <h1 className="main">31 Picks of the best thoughts</h1>
            <div className="sub">
                <p>Write your best advise</p>
                <p> No login, just click your favorite !</p>
            </div>

        </div>
      <div className="posts">
        <div className="sorting-category">
            <div className="sorting-top">Top</div>
            <div className="sorting-new">New</div>
        </div>
                {posts.map((post) => (
                    <div className="post-box" key={post._id}>
                        <h4>{post.subject}</h4>
                        <p>By {post.author}</p>
                        <span className="project-time">
                            {formatDistanceToNow(
                                new Date(post.createdAt),
                                { includeSeconds: true },
                                { addSuffix: true }
                            )}{" "}
                            ago
                        </span>
                        <div>
                            {/* Render comments */}
                            {post.comments.map((comment) => (
                                <div key={comment._id}>
                                    <p>{comment.text}</p>
                                    <p>{comment.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
      </div>
    </div>
  )
}

export default Home
