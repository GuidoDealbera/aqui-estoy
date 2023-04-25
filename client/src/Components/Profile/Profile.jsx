import prueba from '../../data'

export default function Profile (props){
    const CVega = prueba[0];
    return (
        <div>
            <img src={CVega.profileImage} alt={CVega.name} />
            <h2>{CVega.lastName}, {CVega.name}</h2>
            <div>
                <h3>{CVega.birthDate}</h3>
                <h3>{CVega.nacionality}</h3>
                <h3>{CVega.country}</h3>
                <h3>{CVega.timeZone}</h3>
                <h3>{CVega.phone}</h3>
                <h3>{CVega.profession}</h3>
                <h3>{CVega.studies}</h3>
                <h3>{CVega.gender}</h3>
            </div>
        </div>
    )
}