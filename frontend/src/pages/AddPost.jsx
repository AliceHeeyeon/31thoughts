import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

  return (
    <form className="add-form" onSubmit={handleSubmit}>
        <h3>New Thought</h3>

        <div>
            <label>Your thought</label>
            <input
                type="text"
                onChange={(e) => setThought(e.target.value)}
                value={thought}
                placeholder="What's the latest advise that helps you ?"
            />
        </div>

        <div>
            <label>Username</label>
            <input 
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
            />
        </div>

        <div>
            <label>Connect with a community via linkedIn!</label>
            <input 
                type="text"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
            />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddPost
