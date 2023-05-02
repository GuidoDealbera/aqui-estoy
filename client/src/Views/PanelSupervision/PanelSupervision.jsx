//IMPORTACIONES DE REACT/FUNCIONALES
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { groupConsecutiveTurns, sortByDay, sortByTime } from './PanelSupervisorHelpers';
import { getAllSupervisorShiftAssign, getAllCompanionShiftAssign } from '../../Redux/Actions/viewActions';
//IMPORTACIONES DE MATERIAL UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { Box } from '@mui/system';


export default function PanelSupervision() {

    const dispatch = useDispatch(); //Para mandar traer los turnos del back.

    const [supervisorCells, setSupervisorCells] = React.useState( //Para renderizar los turnos
        [[], [], [], [], [], [], []]
    );

    const [acompananteCells, setAcompananteCells] = React.useState( //Para renderizar los turnos
        [[], [], [], [], [], [], []]
    );

    const [day, setDay] = React.useState(0); //Para el paginado por dias de la semana

    const { allCompanionShiftAssign, allSupervisorShiftAssign } = useSelector((state) => state.view)

    useEffect(() => { //Mando a traer la data del back
        dispatch(getAllSupervisorShiftAssign())
        dispatch(getAllCompanionShiftAssign())
    }, [])

    useEffect(() => { //Dejo este useEffect escuchando actualizaciones del estado, cuando llegue la data, que haga la lógica
            const processedSupervisorShifts = allSupervisorShiftAssign.map((person) => {
                const {
                    name,
                    lastName,
                    email,
                    phone,
                    SupervisorShifts,
                } = person;
                return SupervisorShifts.map((turnos) => {
                    const { id, day, time, timezone } = turnos;
                    return {
                        id,
                        name: `${name} ${lastName}`,
                        email,
                        phone,
                        day,
                        time,
                        timezone
                    }
                })
            })

            const sortedSupervisorsByDay = sortByDay(processedSupervisorShifts);

            const readySupervisor = groupConsecutiveTurns(sortByTime(sortedSupervisorsByDay))

            const processedCompanionShifts = allCompanionShiftAssign.map((person) => {
                const {
                    name,
                    lastName,
                    email,
                    phone,
                    CompanionShifts,
                } = person;
                return CompanionShifts.map((turno) => {
                    const { id, day, time, timezone } = turno;
                    return {
                        id,
                        name: `${name} ${lastName}`,
                        email,
                        phone,
                        day,
                        time,
                        timezone
                    }
                })
            })
            const sortedCompanionsByDay = sortByDay(processedCompanionShifts);

            const readyCompanion = groupConsecutiveTurns(sortByTime(sortedCompanionsByDay))

            setSupervisorCells(readySupervisor)
            setAcompananteCells(readyCompanion)
    }, [allCompanionShiftAssign, allSupervisorShiftAssign])

    const handleChange = (event) => { //Para el boton de los días.
        setDay(event.target.value);
    };

    return (
        <Box>
            <FormControl sx={{ minWidth: "100px", margin: "10px" }}> {/*Este Form Control Renderiza el Botón de los días*/}
                <InputLabel>Día</InputLabel>
                <Select
                    value={day}
                    label="Día"
                    onChange={handleChange}
                >
                    <MenuItem value={0}>Lunes</MenuItem>
                    <MenuItem value={1}>Martes</MenuItem>
                    <MenuItem value={2}>Miércoles</MenuItem>
                    <MenuItem value={3}>Jueves</MenuItem>
                    <MenuItem value={4}>Viernes</MenuItem>
                    <MenuItem value={5}>Sábado</MenuItem>
                    <MenuItem value={6}>Domingo</MenuItem>
                </Select>
            </FormControl>
            <TableContainer component={Paper}>
                <Table Table sx={{ minWidth: 650, fontSize: "small" }} size="small">
                    <Box border={"solid"} borderRadius={"10px"}>
                        <TableHead> {/* Head de la Tabla (Texto de Disponibilidad Horaria y Celdas Horarias) */}
                            <TableRow>
                                <TableCell align="center" colSpan={25}>
                                    Disponibilidad horaria
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ height: "15px" }}>
                                <TableCell sx={{ border: "solid 2px black", minWidth: "50px", padding: "3px" }} align="center"><Typography fontSize={"small"} fontWeight={"bold"}>Horario</Typography></TableCell>
                                {Array.from(Array(24).keys()).map((hour) => {
                                    return (
                                        <TableCell
                                            key={hour}
                                            align="center"
                                            sx={{
                                                border: "solid 2px black",
                                                minWidth: "100px",
                                                padding: "3px",
                                            }}
                                        >
                                            <Typography fontSize={"small"} fontWeight={"bold"}>{hour}</Typography>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody> {/* La Tabla en cuestión */}
                            <TableRow> {/* Row para las leyendas */}
                                <TableCell sx={{ border: "solid 1px #e6e6e6", minWidth: "100px", padding: "3px" }} align="center">
                                    <Typography fontSize={"small"} fontWeight={"bold"}>Supervisores</Typography>
                                </TableCell>
                                {Array.from(Array(24).keys()).map((hour) => {
                                    return (
                                        <TableCell key={`supervisor-${hour}`} align="center" sx={{ border: "solid 1px #e6e6e6", minWidth: "100px", padding: "3px" }}>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            {supervisorCells[day].map((turno) => { {/* Aca se renderizan todos los turnos en cuestión */}
                                const { name, email, phone, time, } = turno;
                                const initialTime = parseInt(time.split('-')[0]);
                                const finalTime = parseInt(time.split('-')[1]);
                                const duration = finalTime - initialTime;
                                return (
                                    <TableRow sx={{ height: "15px" }}> {/* Retorno una nueva Table Row por cada turno */}
                                        <TableCell></TableCell>
                                        {Array.from(Array(24 - duration + 1).keys()).map((hour) => { {/* Renderizo las celdas */}
                                            return (
                                                <TableCell
                                                    size='small'
                                                    onClick={hour === initialTime ? () => { alert(`Phone: ${phone} | Email: ${email}`) } : null}
                                                    key={`${name}-${hour}`}
                                                    align="center"
                                                    colSpan={hour === initialTime ? duration : 1}
                                                    sx={{
                                                        backgroundColor: hour === initialTime ? "orange" : null,
                                                        cursor: hour === initialTime ? "pointer" : null,
                                                        '&:hover': {
                                                            backgroundColor: hour === initialTime ? "#d5ab00" : null,
                                                        },
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden',
                                                        border: "solid 1px #e6e6e6",
                                                        padding: "3px"
                                                    }}
                                                >
                                                    {hour === initialTime ? <Typography fontSize={"small"} fontWeight={"bold"}>{name}</Typography> : null}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                            <TableRow> {/* Row para las leyendas */}
                                <TableCell sx={{ border: "solid 1px #e6e6e6", minWidth: "100px", padding: "3px" }}>
                                    <Typography fontSize={"small"} fontWeight={"bold"}>Acompañantes</Typography>
                                </TableCell>
                                {Array.from(Array(24).keys()).map((hour) => {
                                    return (
                                        <TableCell key={`supervisor-${hour}`} align="center" sx={{ border: "solid 1px #e6e6e6", minWidth: "100px", padding: "3px" }}>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            {acompananteCells[day].map((turno) => { {/* Aca se renderizan todos los turnos en cuestión */}
                                const { name, email, phone, time, } = turno;
                                const initialTime = parseInt(time.split('-')[0]);
                                const finalTime = parseInt(time.split('-')[1]);
                                const duration = finalTime - initialTime;
                                return (
                                    <TableRow> {/* Retorno una nueva Table Row por cada turno */}
                                        <TableCell></TableCell>
                                        {Array.from(Array(24 - duration + 1).keys()).map((hour) => { {/* Renderizo las celdas */}
                                            return (
                                                <TableCell
                                                    onClick={hour === initialTime ? () => { alert(`Phone: ${phone} | Email: ${email}`) } : null}
                                                    key={`${name}-${hour}`}
                                                    align="center"
                                                    colSpan={hour === initialTime ? duration : 1}
                                                    sx={{
                                                        backgroundColor: hour === initialTime ? "yellow" : null,
                                                        cursor: hour === initialTime ? "pointer" : null,
                                                        '&:hover': {
                                                            backgroundColor: hour === initialTime ? "#d5ab00" : null,
                                                        },
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden',
                                                        border: "solid 1px #e6e6e6",
                                                        padding: "3px"
                                                    }}
                                                >
                                                    {hour === initialTime ? <Typography fontSize={"small"} fontWeight={"bold"}>{name}</Typography> : null}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Box>
                </Table>
            </TableContainer>
        </Box>
    )
}
