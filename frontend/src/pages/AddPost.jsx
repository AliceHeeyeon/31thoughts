import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const baseUrl = import.meta.env.VITE_BASEURL;

const AddPost = () => {
    const navigate = useNavigate();

    const [thought, setThought] = useState("");
    const [userName, setUserName] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${baseUrl}/posts/`,
                {
                    subject: thought,
                    author: userName,
                    linkedin: linkedin
                }
            );
            setThought("");
            setUserName("");
            setLinkedin("");

            if(response.status === 200) {
                console.log("New Post added", response.data);
                navigate("/");
            }
        } catch(err) {
            console.log(err.response);
            setError(err.message);
        }
    };

    const goBack = () => {
        navigate("/")
    }

  return (
    <form className="page" onSubmit={handleSubmit}>
        <div 
            className="back-btn"
            onClick = {goBack}
        >
            <HiOutlineArrowNarrowLeft />
            <p>Back</p>
        </div>

        <h3 className="page-title">New Thought</h3>

        <div className="form-top">
            <div className="form-label">
                <label>Your thought</label>
                <span>*</span>
            </div>
            
            <textarea
                type="text"
                onChange={(e) => setThought(e.target.value)}
                value={thought}
                placeholder="What's the latest advise that helps you ?"
            />
        </div>

        <div className="form-bottom">
         
            <div className="form-label">
                <label>Username</label>
                <span>*</span>
            </div>
            <textarea 
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className="input-username"
            />
       
            <label className="form-linkedin">
                Open to connect? Link your LinkedIn!
            </label>
            <textarea 
                type="text"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
                className="input-linkedin"
            />
       
        </div>

        <button type="submit" className="submit-btn">SUBMIT</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddPost
