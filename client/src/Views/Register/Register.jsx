import React, { useState } from 'react'
import axios from "axios"
import { Image } from "cloudinary-react"

export default function Register() {

    const [imageUpload, setImageUpload] = useState("");

    const [state, setState] = useState({
        form: {
            foto_perfil: "",
            nombre: "",
            apellido: "",
            fecha_nacimiento: "",
            nacionalidad: "",
            pais_residencia: "",
            huso_horario: "",
            mail: "",
            telefono: "",
            estudios_relaciondos: "",
            estudios_alcanzados: "",
            genero: ""
        },
        index: 0
    });

    const clickHandler = (event) => {
        const { target } = event;
        const { name } = target;
        switch (name) {
            case "Siguiente":
                setState({
                    ...state,
                    index: state.index + 1
                })
                break;

            case "Anterior":
                setState({
                    ...state,
                    index: state.index - 1
                })
                break;

            default:
                break;
        }
    }

    const changeHandler = (event) => {
    }

    const uploadImage = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", imageUpload)
        formData.append("upload_preset", "mzntwjvh")

        const response = await axios.post("https://api.cloudinary.com/v1_1/dqvz1juaf/image/upload", formData)
        setState({
            ...state, form: {
                ...state.form,
                foto_perfil: response.data.url
            }
        })
    }

    switch (state.index) {
        case 0:
            return (
                <div>
                    <form>
                        <div>
                            <label>Foto de Perfil</label>
                            <input type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }}>
                            </input>
                            <Image style={{width:200}} cloudName="dqvz1juaf" publicId={state.form.foto_perfil}/>
                        </div>
                        <div>
                            <label>Nombre</label>
                            <input></input>
                        </div>
                        <div>
                            <label>Apellido</label>
                            <input></input>
                        </div>
                        <div>
                            <label>Fecha de Nacimiento</label>
                            <input></input>
                        </div>
                    </form>
                    <button name="Siguiente" onClick={clickHandler}>Continuar</button>
                </div>
            )

        case 1:
            return (
                <div>
                    <form>
                        <div>
                            <label>Nacionalidad</label>
                            <input></input>
                        </div>
                        <div>
                            <label>Pais de residencia actual</label>
                            <input></input>
                        </div>
                        <div>
                            <label>Ciudad / huso horario de residencia</label>
                            <input></input>
                        </div>
                        <div>
                            <label>*E-mail</label>
                            <input></input>
                        </div>
                    </form>
                    <button name="Anterior" onClick={clickHandler}>Volver</button>
                    <button name="Siguiente" onClick={clickHandler}>Continuar</button>
                </div>
            )

        case 2:
            return (
                <div>
                    <form>
                        <div>
                            <label>Teléfono</label>
                            <input></input>
                        </div>
                        <div>
                            <label>¿Estudias o trabajas en alguna de estas areas?</label>
                            <input></input>
                        </div>
                        <div>
                            <label>Estudios alcanzados</label>
                            <input></input>
                        </div>
                        <div>
                            <label>¿Con qué genero te identificas?</label>
                            <input></input>
                        </div>
                        <button name="Anterior" onClick={clickHandler}>Volver</button>
                        <button name="Submit" onClick={uploadImage}>Finalizar</button>
                    </form>
                </div>
            )

        default:
            break;
    }
}