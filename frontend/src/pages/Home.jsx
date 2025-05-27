import React from "react";
import { useState, useEffect } from "react"
import axios from 'axios'
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { BsFire } from "react-icons/bs";
import { BsStars } from "react-icons/bs";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

//When testing
//const baseUrl = process.env.VITE_BASEURL;

const baseUrl = import.meta.env.VITE_BASEURL;
const MAX_LIKES_PER_POST = 1;

const Home = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState("likes");
    const [copiedPostId, setCopiedPostId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            
            try {
                const response = await axios.get(`${baseUrl}/posts`);
                setPosts(response.data);
                setLoading(false);
                
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
                setLoading(false)
            }
        };

        fetchPosts();
  }, [posts]);  

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  },[])

    const getLikesFromLocalStorage = (postId) => {
        const likes = localStorage.getItem(`post-${postId}-likes`);
        return likes ? parseInt(likes, 10) : 0;
    };

    const incrementLikesInLocalStorage = (postId) => {
        const currentLikes = getLikesFromLocalStorage(postId);
        localStorage.setItem(`post-${postId}-likes`, currentLikes + 1);
    };

    const canLikePost = (postId) => {
        const currentLikes = getLikesFromLocalStorage(postId);
        return currentLikes < MAX_LIKES_PER_POST;
    };

    const handleLike = async (postId) => {
        if (!canLikePost(postId)) {
            alert(`You can only like a post up to ${MAX_LIKES_PER_POST} times.`);
            return;
        }
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
            incrementLikesInLocalStorage(postId);
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

  if(loading) {
    return (
        <div className="loading dark:bg-gray-900">
            <svg width={0} height={0}>
                <defs>
                <linearGradient id="my_gradient">
                    <stop offset="0%" stopColor="#e01cd5" />
                    <stop offset="100%" stopColor="#fb64b2" />
                </linearGradient>
                </defs>
            </svg>
            <CircularProgress sx={{'svg circle': { stroke: 'url(#my_gradient)' } }} />
            <p className="text-loading dark:text-gray-200">Loading</p>
        </div>
    )
  }

  return (
    <div className="home page bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="hero">
            <h1 className="main text-gray-800 dark:text-gray-100">31 Picks of the best thoughts</h1>
            <div className="sub text-gray-600 dark:text-gray-300">
                <p>Write your best advise</p>
                <p> No login, just click your favorite !</p>
            </div>

        </div>
      <div className="posts">
        <div className="sorting-category bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div
                className={`sorting-option ${sortBy === 'likes' ? 'sorting-like text-pink-500 border-pink-500' : 'text-gray-700 dark:text-gray-300 border-transparent hover:text-pink-500 dark:hover:text-pink-400'} cursor-pointer p-4 flex items-center justify-center`}
                onClick={sortingByLike}
            >
                <BsFire className="mr-2" />Top
            </div>
            <div
                className={`sorting-option ${sortBy === 'date' ? 'sorting-date text-pink-500 border-pink-500' : 'text-gray-700 dark:text-gray-300 border-transparent hover:text-pink-500 dark:hover:text-pink-400'} cursor-pointer p-4 flex items-center justify-center`}
                onClick={sortingByDate}
            >
                <BsStars className="mr-2" />New
            </div>
        </div>
                {posts.map((post, index) => (
                    <div
                        className="post-box bg-white dark:bg-gray-800 shadow-md rounded-lg my-4 p-4"
                        key={post._id}
                    >

                        <div className="post-top flex justify-between items-center">
                            <p
                                className="text-lg font-semibold text-gray-800 dark:text-gray-100 cursor-zoom-in"
                                onClick={() => navigate(`/${post._id}`)}
                            >
                                {index + 1}. {post.subject}
                            </p>
                            <div className="like flex items-center text-gray-600 dark:text-gray-400">
                                {post.likes}
                                <BsFillHandThumbsUpFill
                                    onClick={() => handleLike(post._id)}
                                    className="cursor-pointer ml-1 text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-500"
                                />
                            </div>
                        </div>

                        <div className="post-bottom mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {post.linkedin ? (
                                <a className='user-linkedin text-blue-500 hover:underline dark:text-blue-400' href={`https://www.linkedin.com/in/${post.linkedin}/`} target="_blank" rel="noopener noreferrer">
                                    {post.author}
                                </a>
                            ) : (
                                <span className="font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
                            )}
                            <span className="post-time mx-1">
                                {formatDistanceToNow(
                                    new Date(post.createdAt),
                                    { includeSeconds: true },
                                    { addSuffix: true }
                                )}{" "}
                                ago |
                            </span>
                            <p
                                className="comment-number cursor-pointer hover:underline"
                                onClick={() => navigate(`/${post._id}`)}
                            >
                                {post.comments.length} comment{post.comments.length >  1 ? 's' : ''}
                            </p>

                            <CopyToClipboard text={`https://31thoughts.vercel.app/#/${post._id}`}
                            onCopy={() => handleCopy(post._id)}
                            >
                            <span className="cursor-copy hover:text-pink-500 dark:hover:text-pink-400 ml-1">| Share</span>
                            </CopyToClipboard>

                            {copiedPostId === post._id && (
                                <Alert
                                    severity="success"
                                    color="warning" // This might need a dark mode variant if MUI doesn't handle it
                                    className="alert absolute bottom-0 right-0 mb-2 mr-2" // Adjusted positioning
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
