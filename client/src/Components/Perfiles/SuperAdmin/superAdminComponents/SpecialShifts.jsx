import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CompanionTimezoneMiddleware from '../../../Calendary/CalendarCompanion/TimezoneMiddleware';
import SupervisorTimezoneMiddleware from '../../../Calendary/CalendarSuperAdmin/TimezoneMiddleware';
import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { putCompanionShiftRules, putSupervisorShiftRules } from '../../../../Redux/Actions/postPutActions';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { toastWarning } from '../../../../Redux/Actions/alertStyle';

export default function SpecialShifts({ rol }) {
    let user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    if (rol === 'Supervisor') {
        let unprocessedShifts = useSelector((state) => state.view.supervisorsPerShift);
        let shifts = SupervisorTimezoneMiddleware(unprocessedShifts, user.CityTimeZone.offSet);
        let perShift = shifts.map((shift) => {
            switch (shift.day) {
                case 0:
                    return {
                        ...shift,
                        day: "Lunes",
                    };
                case 1:
                    return {
                        ...shift,
                        day: "Martes",
                    };
                case 2:
                    return {
                        ...shift,
                        day: "Miércoles",
                    };
                case 3:
                    return {
                        ...shift,
                        day: "Jueves",
                    };
                case 4:
                    return {
                        ...shift,
                        day: "Viernes",
                    };
                case 5:
                    return {
                        ...shift,
                        day: "Sábado",
                    };
                case 6:
                    return {
                        ...shift,
                        day: "Domingo",
                    };

                default:
                    return;
            }
        });
        let withRules = perShift.filter((shift) => shift.hasRules);
        const [checked, setChecked] = React.useState([]);

        const handleConfirm = () => {
            if (checked.length > 0) {
                Swal.fire({
                    title: '¿Estás seguro que quieres eliminar las configuraciones seleccionadas?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (user.rol === "SuperAdmin") {
                            const IDs = checked.map((shift) => shift.originalShift.shiftId)
                            dispatch(putSupervisorShiftRules(IDs))
                        }
                    } else {
                    }
                });
            } else {
                toast.error("Debe seleccionar al menos un turno", toastWarning);
            }
        };

        const handleToggle = (value) => () => {
            const found = checked.find(shift => shift.shiftId === value.shiftId);
            if (found) {
                const newChecked = checked.filter((shift) => { return shift.shiftId !== value.shiftId })
                setChecked(newChecked);
            } else {
                setChecked([...checked, value]);
            }
        };

        const handleDelete = (value) => {
            Swal.fire({
                title: '¿Estás seguro que deseas eliminar esta configuración?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (user.rol === "SuperAdmin") {
                        const { shiftId } = value.originalShift;
                        dispatch(putSupervisorShiftRules([shiftId]))
                    }
                }
            });
        }

        return (
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant='h5' sx={{ marginTop: "10px", marginBottom: "10px" }}>Lista de Turnos con Configuraciones Específicas</Typography>
                {withRules.length === 0 ? <Box sx={{ display: "flex", alignItems: "center" }}><Typography variant='body1' sx={{ marginTop: "10px", marginBottom: "10px", marginRight: "10px" }}>No hay turnos con configuración específica</Typography><ErrorOutlineIcon /></Box> : (
                    <>
                        <Button variant='contained' color='error' sx={{ marginTop: "10px", marginBottom: "10px" }} onClick={handleConfirm}>Eliminar configuraciones seleccionadas</Button>
                        <List>
                            {withRules.map((value) => {
                                return (<Box key={value.shiftId}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton onClick={() => { handleDelete(value) }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton onClick={handleToggle(value)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={!!checked.find(shift => shift.shiftId === value.shiftId)}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText key={value.shiftId} primary={`${value.day} (${value.time})`} />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </Box>);
                            })}
                        </List>
                    </>
                )}
            </Box>
        );
    } else {
        let unprocessedShifts = useSelector((state) => state.view.companionsPerShift);
        let shifts = CompanionTimezoneMiddleware(unprocessedShifts, user.CityTimeZone.offSet);
        let perShift = shifts.map((shift) => {
            switch (shift.day) {
                case 0:
                    return {
                        ...shift,
                        day: "Lunes",
                    };
                case 1:
                    return {
                        ...shift,
                        day: "Martes",
                    };
                case 2:
                    return {
                        ...shift,
                        day: "Miércoles",
                    };
                case 3:
                    return {
                        ...shift,
                        day: "Jueves",
                    };
                case 4:
                    return {
                        ...shift,
                        day: "Viernes",
                    };
                case 5:
                    return {
                        ...shift,
                        day: "Sábado",
                    };
                case 6:
                    return {
                        ...shift,
                        day: "Domingo",
                    };

                default:
                    return;
            }
        });
        let withRules = perShift.filter((shift) => shift.hasRules);
        const [checked, setChecked] = React.useState([]);

        const handleConfirm = () => {
            if (checked.length > 0) {
                Swal.fire({
                    title: '¿Estás seguro que quieres eliminar las configuraciones seleccionadas?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (user.rol === "SuperAdmin") {
                            const IDs = checked.map((shift) => shift.originalShift.shiftId)
                            dispatch(putCompanionShiftRules(IDs))
                        }
                    } else {
                    }
                });
            } else {
                toast.error("Debe seleccionar al menos un turno", toastWarning);
            }
        };

        const handleToggle = (value) => () => {
            const found = checked.find(shift => shift.shiftId === value.shiftId);
            if (found) {
                const newChecked = checked.filter((shift) => { return shift.shiftId !== value.shiftId })
                setChecked(newChecked);
            } else {
                setChecked([...checked, value]);
            }
        };

        const handleDelete = (value) => {
            Swal.fire({
                title: '¿Estás seguro que deseas eliminar esta configuración?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (user.rol === "SuperAdmin") {
                        const { shiftId } = value.originalShift;
                        dispatch(putCompanionShiftRules([shiftId]))
                    }
                }
            });
        }

        return (
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant='h5' sx={{ marginTop: "10px", marginBottom: "10px" }}>Lista de Turnos con Configuraciones Específicas</Typography>
                {withRules.length === 0 ? <Box sx={{ display: "flex", alignItems: "center" }}><Typography variant='body1' sx={{ marginTop: "10px", marginBottom: "10px", marginRight: "10px" }}>No hay turnos con configuración específica</Typography><ErrorOutlineIcon /></Box> : (
                    <>
                        <Button variant='contained' color='error' sx={{ marginTop: "10px", marginBottom: "10px" }} onClick={handleConfirm}>Eliminar configuraciones seleccionadas</Button>
                        <List>
                            {withRules.map((value) => {
                                return (<Box key={value.shiftId}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton onClick={() => { handleDelete(value) }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton onClick={handleToggle(value)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={!!checked.find(shift => shift.shiftId === value.shiftId)}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText key={value.shiftId} primary={`${value.day} (${value.time})`} />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </Box>);
                            })}
                        </List>
                    </>
                )}
            </Box>
        );
    }
}