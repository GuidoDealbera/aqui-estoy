// IMPORTACIONES DE REACT
import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
// IMPORTACIONES PARA TRAER EL USUARIO
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../Redux/Actions/viewActions';
// IMPORTACIONES DE MUI/ESTILOS
import { Avatar, Typography, Box, Grid } from '@mui/material';
import {useTheme} from '@mui/material';
import styles from './ViewProfileStyles';

export default function ViewProfile() {

    const theme = useTheme();
    
    const { viewUser } = useSelector((state) => state.view)
    const { name, lastName, email, profilePhoto, birthdayDate, nationality, phone, studies, gender, profession } = viewUser;

    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        dispatch(getUserById(id))
    }, [])

    return (
        <Grid container sx={{ ...styles.container, [theme.breakpoints.down('sm')]: { paddingTop: '20px' } }} maxWidth="false">
            <Grid item sx={styles.header} sm={10} md={5}>
                <Avatar sx={styles.header.avatar} src={profilePhoto} />
                <Typography variant="h5">{name} {lastName}</Typography>
            </Grid>
            <Grid item sx={styles.body} sm={10} md={5}>
                <Box sx={{ ...styles.body.info, borderTop: "none" }} id="primero">
                    <Typography sx={styles.body.info.label}>Correo electrónico</Typography>
                    <Typography sx={styles.body.info.data}>{email}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Teléfono</Typography>
                    <Typography  component="a" href={`https://wa.me/${phone}`} target="_blank" sx={styles.body.info.data}>{phone}</Typography>
                </Box>           
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Nacionalidad</Typography>
                    <Typography sx={styles.body.info.data}>{nationality}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Profesión</Typography>
                    <Typography sx={styles.body.info.data}>{profession}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Estudios</Typography>
                    <Typography sx={styles.body.info.data}>{studies}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Fecha de nacimiento</Typography>
                    <Typography sx={styles.body.info.data}>{birthdayDate}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Género</Typography>
                    <Typography sx={styles.body.info.data}>{gender}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
