import {voluntario} from '../../../data'

export default function Companion (props){
    const CGrillia = voluntario[0];
    return (
        <div>
            <img src={CGrillia.profileImage} alt={CGrillia.name} />
            <h2>{CGrillia.lastName}, {CGrillia.name}</h2>
            <div>
                <h3>{CGrillia.birthDate}</h3>
                <h3>{CGrillia.nacionality}</h3>
                <h3>{CGrillia.country}</h3>
                <h3>{CGrillia.timeZone}</h3>
                <h3>{CGrillia.phone}</h3>
                <h3>{CGrillia.profession}</h3>
                <h3>{CGrillia.studies}</h3>
                <h3>{CGrillia.gender}</h3>
            </div>
        </div>
    )
}