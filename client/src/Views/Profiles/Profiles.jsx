import Companion from "../../Components/Perfiles/Companion/Companion";
import Supervisor from "../../Components/Perfiles/Supervisor/Supervisor";
import SuperAdmin from "../../Components/Perfiles/SuperAdmin/SuperAdmin";
import { useSelector } from "react-redux";

export default function Profiles(props) {
    const {user} = useSelector((state) => state.auth);
    const render = () => {
        const {rol} = user;
        switch(rol){
            case 'Supervisor':
                return <Supervisor user={user}/>;
            case 'SuperAdmin':
                return <SuperAdmin user={user}/>;
            case 'Companion':
                return <Companion user={user}/>
            default:
                return (
                    <div>
                        <h1>Page Not Found</h1>
                        <h1>Error 404</h1>
                    </div>
                )
        }
    }
  return render();
}


