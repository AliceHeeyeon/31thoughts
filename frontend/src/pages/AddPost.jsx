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

        if(!thought || !userName) {
            setError("Hey! Can you fill in the required field?😱");
            return;
        }

        const linkedinPattern = /^((https?:\/\/)?(www\.)?linkedin\.com\/in\/)/
        if (linkedinPattern.test(linkedin)) {
            setError("Please enter what comes after 'https://www.linkedin.com/in/'")
            return;
        }

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
    <form className="page bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6" onSubmit={handleSubmit}>
        <div
            className="back-btn cursor-pointer flex items-center text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300"
            onClick = {goBack}
        >
            <HiOutlineArrowNarrowLeft className="mr-1" />
            <p>Back</p>
        </div>

        <h3 className="page-title text-3xl font-semibold my-4 text-gray-800 dark:text-gray-100">New Thought</h3>

        <div className="form-top mb-6">
            <div className="form-label mb-1">
                <label className="text-gray-700 dark:text-gray-300">Your thought</label>
                <span className="text-red-500 ml-1">*</span>
            </div>
            
            <textarea
                type="text"
                onChange={(e) => setThought(e.target.value)}
                value={thought}
                placeholder="What's the latest advise that helps you ?"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-pink-500 focus:border-pink-500"
            />
        </div>

        <div className="form-bottom mb-6">
         
            <div className="form-label mb-1">
                <label className="text-gray-700 dark:text-gray-300">Username</label>
                <span className="text-red-500 ml-1">*</span>
            </div>
            <textarea
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className="input-username w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-pink-500 focus:border-pink-500"
            />
       
            <label className="form-linkedin mt-4 mb-1 text-gray-700 dark:text-gray-300">
                Open to connect? Link your LinkedIn!
            </label>
            <textarea
                type="text"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
                placeholder="Just include what comes after 'in/'"
                className="input-linkedin w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-pink-500 focus:border-pink-500"
            />
            {error && <div className="error text-red-500 dark:text-red-400 mt-2">{error}</div>}
        </div>
        
        <button type="submit" className="submit-btn w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline dark:bg-pink-600 dark:hover:bg-pink-700">
            SUBMIT
        </button>
        
    </form>
  )
}

export default AddPost
