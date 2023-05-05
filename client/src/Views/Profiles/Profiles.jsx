import Companion from "../../Components/Perfiles/Companion/Companion";
import Supervisor from "../../Components/Perfiles/Supervisor/Supervisor";
import SuperAdmin from "../../Components/Perfiles/SuperAdmin/SuperAdmin";
import Loader from "../../Components/Loader/Loader";
import { useSelector } from "react-redux";

export default function Profiles(props) {
  const { user } = useSelector((state) => state.auth);
  const render = () => {
    const { rol } = user;
    switch (rol) {
      case "Supervisor":
        return <Supervisor user={user} />;
      case "SuperAdmin":
        return <SuperAdmin user={user} />;
      case "Companion1":
        return <Companion user={user} />;
        case "Companion2":
        return <Companion user={user} />;
      default:
        return <Loader />
        
    }
  };
  return render();
}
