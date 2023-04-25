import { useParams, useNavigate } from "react-router-dom";

export default function Landing (props){
    const navigate = useNavigate();
    const toProfile = () => {
        navigate(`/profile/Chiringuito`)
    }
    return (
        <div>
            <h1>Landing Component</h1>
            <button onClick={toProfile}>Log In</button>
        </div>
    )
}

