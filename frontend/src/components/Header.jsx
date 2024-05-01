import { useNavigate } from "react-router-dom"

const Header = () => {
  
  const navigate = useNavigate();
  return (
    <div className="header">
      <div 
        className="logo"
        onClick={() => navigate("/")}
      >
        <span>31</span>
        Thoughts
      </div>
      <button 
        className="new-btn"
        onClick={() => navigate("/newthought")}
      >
        + NEW
      </button>
    </div>
  )
}

export default Header
