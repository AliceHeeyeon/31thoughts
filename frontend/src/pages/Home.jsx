import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios'

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
      <div className="posts">
                {posts.map((post) => (
                    <div key={post._id}>
                        <h4>{post.subject}</h4>
                        <p>{post.text}</p>
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
