import { prueba } from "../../../data";

export default function Supervisor(props) {
  const user = prueba[0];
  return (
    <div>
      <img src={user.profileImage} alt={user.name} />
      <h2>
        {user.lastName}, {user.name}
      </h2>
      <div>
        <h3>{user.birthDate}</h3>
        <h3>{user.nacionality}</h3>
        <h3>{user.country}</h3>
        <h3>{user.timeZone}</h3>
        <h3>{user.email}</h3>
        <h3>{user.phone}</h3>
        <h3>{user.profession}</h3>
        <h3>{user.studies}</h3>
        <h3>{user.gender}</h3>
        <button>Panel de supervision</button>
      </div>
      <button>Disponibilidad de turnos de voluntario</button>
      <button>Horarios de Supervisión</button>
      <button>Personas a cargo</button>
      <button>Centro de aprendizaje</button>
    </div>
  );
}
