import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Alert from '@mui/material/Alert';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    XIcon,
  } from "react-share";

const baseUrl = import.meta.env.VITE_BASEURL;

const SinglePost = () => {
    const navigate= useNavigate();
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [userName, setUserName] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`${baseUrl}/posts/${id}`)
        .then((res) => {
            setPost(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[id, post])

    const handleLike = async(postId) => {
        try {
            const response = await axios.post(`${baseUrl}/posts/${postId}/like`)
    
            setPost({ ...post, likes: response.data.likes });     
        } catch(err) {
            console.error("Error liking post:", err)
        }
    }

    const handleAddComment = async () => {
        if(!newComment || !userName){
            setError("Add your comment and name – easy peasy! 😉")
            return
        }
      
        try {
            const response = await axios.post(`${baseUrl}/comments/${id}/comments`,
                {
                    text: newComment,
                    author: userName
                }
            );

            if(response.status === 201) {
                const newComment = response.data;
                const updatedComments = [...post.comments, newComment];
                const updatedPost = {...post, comments: updatedComments};

                setPost(updatedPost);
                setNewComment("");
                setUserName("");
                setError("");
            }
        } catch(err) {
            console.error("Error Adding Comment:", err);
            setError(err)
        }

    };

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        },1000);
    };

    const goBack = () => {
        navigate("/")
    }

    if(!post) return null;

    const shareUrl = `https://31thoughts.vercel.app/#/${id}`;
    
  return (
    <div className="single-page page bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
        <div
            className="back-btn cursor-pointer flex items-center text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 mb-4"
            onClick = {goBack}
        >
            <HiOutlineArrowNarrowLeft className="mr-1" />
            <p>Back</p>
        </div>
        {post && (
            <>
            <div className="post-box bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">

                <div className="post-top flex justify-between items-start">
                    <p className="text text-2xl font-semibold text-gray-800 dark:text-gray-100">{post.subject}</p>
                    <div className="like flex items-center text-gray-600 dark:text-gray-400">
                        {post.likes}
                        <BsFillHandThumbsUpFill
                            onClick={() => handleLike(post._id)}
                            className="cursor-pointer ml-1 text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-500"
                        />
                    </div>
                </div>
        
                <div className="post-bottom mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <p className="font-medium text-gray-700 dark:text-gray-300">By {post.author}</p>
                    <span className="post-time mx-1">
                        {formatDistanceToNow(
                            new Date(post.createdAt),
                            { includeSeconds: true },
                            { addSuffix: true }
                        )}{" "}
                        ago |
                    </span>
                    <p className="comment-number">{post.comments.length} comment{post.comments.length >  1 ? 's' : ''}</p>
                
                    <CopyToClipboard
                        text={shareUrl}
                        onCopy={handleCopy}
                    >
                        <p className="cursor-copy hover:text-pink-500 dark:hover:text-pink-400 ml-1">| Share</p>
                    </CopyToClipboard>

                    {copied && (
                        <Alert
                            severity="success"
                            color="warning" // Consider dark mode variant for MUI Alert if needed
                            className="alert absolute bottom-0 right-0 mb-2 mr-2"
                        >
                        Link copied to clipboard!
                        </Alert>
                    )}
                
                </div>
                
            </div>
            {/* end of post */}

            <div className="social-sharing flex justify-center space-x-2 my-6">
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round={true} bgStyle={{ fill: 'darkgray' }} iconFillColor="white"/>
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                    <XIcon size={32} round={true} bgStyle={{ fill: 'darkgray' }} iconFillColor="white"/>
                </TwitterShareButton>
                <RedditShareButton url={shareUrl}>
                    <RedditIcon size={32} round={true} bgStyle={{ fill: 'darkgray' }} iconFillColor="white"/>
                </RedditShareButton>
                <TelegramShareButton url={shareUrl}>
                    <TelegramIcon size={32} round={true} bgStyle={{ fill: 'darkgray' }} iconFillColor="white"/>
                </TelegramShareButton>
                <PinterestShareButton url={shareUrl} media={post.subject}>
                    <PinterestIcon size={32} round={true} bgStyle={{ fill: 'darkgray' }} iconFillColor="white"/>
                </PinterestShareButton>
                <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon size={32} round={true} bgStyle={{ fill: 'darkgray' }} iconFillColor="white"/>
                </LinkedinShareButton>
            </div>

            <div className="comments bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">

                <div className="add-comment mb-6">
                    <textarea
                        className="comment-input w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-pink-500 focus:border-pink-500"
                        type="text"
                        placeholder="Add your comment"
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    />
                    <div className="username mt-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User name</label>
                        <input
                            className="comment-username w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-pink-500 focus:border-pink-500"
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                        />
                    </div>
                    {error && <div className="singlepage-error text-red-500 dark:text-red-400 mt-2">{error}</div>}
                    <button
                        onClick={handleAddComment}
                        className="comment-btn mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline dark:bg-pink-600 dark:hover:bg-pink-700"
                    >
                        Add Comment
                    </button>
                </div>

                {post.comments.map((comment) => (
                    <div className="prev-comment border-t border-gray-200 dark:border-gray-700 py-4" key={comment._id}>
                        <p className="text-gray-800 dark:text-gray-100">{comment.text}</p>
                        <div className="prev-comment-bottom mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <p className="font-medium text-gray-700 dark:text-gray-300">By {comment.author}</p>
                            <span className="post-time ml-1">
                                {formatDistanceToNow(
                                    new Date(comment.createdAt),
                                    { includeSeconds: true },
                                    { addSuffix: true }
                                )}{" "}
                                ago
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {/* end of comments */}
            </>
        )}    
    </div>
    
  )
}

export default SinglePost
