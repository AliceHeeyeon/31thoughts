import { useState, useEffect } from "react"
import axios from 'axios'
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const baseUrl = import.meta.env.VITE_BASEURL;

const Home = () => {
    const navigate = useNavigate();
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
  }, [posts]);

  const handleLike = async(postId) => {
  
    try {
        const response = await axios.post(`${baseUrl}/posts/${postId}/like`)

        const updatedPosts = posts.map(post => {
            if(post._id === postId) {
                return {...post, likes: response.data.likes}
            }
            return post;
        });
        setPosts(updatedPosts)
    } catch(err) {
        console.error("Error liking post:", err)
    }
  }

  return (
    <div className="home page">
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
                {posts.map((post, index) => (
                    <div 
                        className="post-box" 
                        key={post._id}
                    >

                        <div className="post-top">
                            <p 
                                className="text"
                                onClick={() => navigate(`/${post._id}`)}
                            
                            >
                                {index + 1}. {post.subject}
                            </p>
                            <div className="like">
                                {post.likes}
                                <BsFillHandThumbsUpFill 
                                    onClick={() => handleLike(post._id)}
                                />
                            </div>
                        </div>

                        <div className="post-bottom">
                            <p>By {post.author}</p>
                            <span className="post-time">
                                {formatDistanceToNow(
                                    new Date(post.createdAt),
                                    { includeSeconds: true },
                                    { addSuffix: true }
                                )}{" "}
                                ago |
                            </span>
                            <p className="comment-number">{post.comments.length} comment{post.comments.length >  1 ? 's' : ''}</p>
                         
                            <CopyToClipboard text={`${baseUrl}/posts/${post._id}`}>
                            <span>| Share</span>
                            </CopyToClipboard>
                        </div>

                    </div>
                ))}
      </div>
    </div>
  )
}

export default Home
