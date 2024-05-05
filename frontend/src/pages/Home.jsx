import { useState, useEffect } from "react"
import axios from 'axios'
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { BsFire } from "react-icons/bs";
import { BsStars } from "react-icons/bs";
import Alert from '@mui/material/Alert';

const baseUrl = import.meta.env.VITE_BASEURL;

const Home = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState("likes");
    const [copiedPostId, setCopiedPostId] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/posts`);
                setPosts(response.data);
                
                if(sortBy === "date") {
                    const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 31);
                    setPosts(sortedPosts);
                    return
                }
                if(sortBy === "likes") {
                    const sortedPosts = response.data.sort((a, b) => b.likes - a.likes).slice(0, 31);
                    setPosts(sortedPosts);
                    return
                }
                
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
  }, [posts]);  


    const handleLike = async (postId) => {
        try {
            const response = await axios.post(`${baseUrl}/posts/${postId}/like`);
            setPosts(prevPosts => {
                if(sortBy === "date") {
                    return prevPosts.map(post => {
                        if(post._id === postId) {
                            return {...post, likes: response.data.likes};
                        }
                        return post;
                    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 31);
                }
                if(sortBy === "likes") {
                    return prevPosts.map(post => {
                        if (post._id === postId) {
                            return {...post, likes: response.data.likes};
                        }
                       
                        return post;
                    }).sort((a, b) => b.likes - a.likes).slice(0, 31);
                }
            });
        } 
        catch(err) {
            console.error("Error liking post:", err);
        }
    };

  const sortingByLike = () => {
    setSortBy("likes");
  }

  const sortingByDate = () => {
    setSortBy("date");
  }

  const handleCopy = (postId) => {
    setCopiedPostId(postId);
    setTimeout(() => {
        setCopiedPostId(null);
    },1000);
  };

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
            <div 
                className={`sorting-option ${sortBy === 'likes' ? 'sorting-like' : ''} cursor-pointer`}
                onClick={sortingByLike}
            >
                <BsFire />Top
            </div>
            <div 
                className={`sorting-option ${sortBy === 'date' ? 'sorting-date' : ''} cursor-pointer`}
                onClick={sortingByDate}
            >
                <BsStars />New
            </div>
        </div>
                {posts.map((post, index) => (
                    <div 
                        className="post-box" 
                        key={post._id}
                    >

                        <div className="post-top">
                            <p 
                                className="text cursor-zoom-in"
                                onClick={() => navigate(`/${post._id}`)}
                            
                            >
                                {index + 1}. {post.subject}
                            </p>
                            <div className="like">
                                {post.likes}
                                <BsFillHandThumbsUpFill 
                                    onClick={() => handleLike(post._id)}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="post-bottom">
                            {post.linkedin ? (
                                <a className='user-linkedin' href={`https://www.linkedin.com/in/${post.linkedin}/`} target="_blank" rel="noopener noreferrer">
                                    {post.author}
                                </a>
                            ) : (
                                <span>{post.author}</span>
                            )}
                            <span className="post-time">
                                {formatDistanceToNow(
                                    new Date(post.createdAt),
                                    { includeSeconds: true },
                                    { addSuffix: true }
                                )}{" "}
                                ago |
                            </span>
                            <p 
                                className="comment-number cursor-pointer"
                                onClick={() => navigate(`/${post._id}`)}
                                
                            >
                                {post.comments.length} comment{post.comments.length >  1 ? 's' : ''}
                            </p>
                         
                            <CopyToClipboard text={`https://31thoughts.vercel.app/${post._id}`}
                            onCopy={() => handleCopy(post._id)}
                            >
                            <span className="cursor-copy">| Share</span>
                            </CopyToClipboard>

                            {copiedPostId === post._id && (
                                <Alert 
                                    severity="success" 
                                    color="warning"
                                    className="alert"
                                >
                                    Link copied to clipboard!
                                </Alert>
                            )}
                        </div>

                    </div>
                ))}
      </div>
    </div>
  )
}

export default Home
