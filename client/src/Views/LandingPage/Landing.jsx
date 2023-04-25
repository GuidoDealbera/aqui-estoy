import { useParams, useNavigate } from "react-router-dom";
import style from "./Landing.module.css"

export default function Landing(props) {
  const navigate = useNavigate();
  const toProfile = () => {
    navigate(`/profile/Chiringuito`);
  };
  return (
    <div className={style.conteiner}>
        
      <h1>Aquí estoy! Plataforma de turnos</h1>

      <h3>En esta plataforma podrás agendar tu turno para tu voluntariado!.</h3>

      <h3>
        Si sos supervisor esta plataforma te servira para administrar los
        voluntarios a tu cargo.
      </h3>

      <button onClick={toProfile}>Comenzar</button>
    </div>
  );
}
