import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Alert from '@mui/material/Alert';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const baseUrl = import.meta.env.VITE_BASEURL;

const SinglePost = () => {
    const navigate= useNavigate();
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [userName, setUserName] = useState("");
    const [copied, setCopied] = useState(false);

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
            }
        } catch(err) {
            console.error("Error Adding Comment:", err);
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
    
  return (
    <div className="single-page page">
        <div 
            className="back-btn"
            onClick = {goBack}
        >
            <HiOutlineArrowNarrowLeft />
            <p>Back</p>
        </div>
        {post && (
            <>
            <div className="post-box">

                <div className="post-top">
                    <p className="text">{post.subject}</p>
                    <div className="like">
                        {post.likes}
                        <BsFillHandThumbsUpFill 
                            onClick={() => handleLike(post._id)}
                        />
                    </div>
                </div>
        
                <div className="post-bottom">
                    <p>By {post.author}</p>
                    <span className="project-time">
                        {formatDistanceToNow(
                            new Date(post.createdAt),
                            { includeSeconds: true },
                            { addSuffix: true }
                        )}{" "}
                        ago |
                    </span>
                    <p className="comment-number">{post.comments.length} comment{post.comments.length >  1 ? 's' : ''}</p>
                
                    <CopyToClipboard 
                        text={`${baseUrl}/posts/${post._id}`}
                        onCopy={handleCopy}
                    >
                        <p>| Share</p>
                    </CopyToClipboard>

                    {copied && (
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
            {/* end of post */}

            <div className="comments">

                <div className="add-comment">
                    <textarea
                        className="comment-input"
                        type="text"
                        placeholder="Add your comment"
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    />
                    <div className="username">
                        <label>user name</label>
                        <input
                            className="comment-username"
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                        />
                    </div>
                    
                    <button 
                        onClick={handleAddComment}
                        className="comment-btn"
                    >
                        Add Comment
                    </button>
                </div>

                {post.comments.map((comment) => (
                    <div className="prev-comment" key={comment._id}>
                        <p>{comment.text}</p>
                        <div className="prev-comment-bottom">
                            <p>By {comment.author}</p>
                            <span className="post-time">
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
