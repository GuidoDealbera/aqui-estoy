import React, { useState } from 'react'

export default function Register() {

    const [state, setState] = useState({
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

    switch (state.index) {
        case 0:
            return (
                <div>
                    <form>
                        <div>
                            <label>Foto de Perfil</label>
                            <input></input>
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
                        <button name="Submit" type='submit'>Finalizar</button>
                    </form>
                </div>
            )

        default:
            break;
    }
}