import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../Redux/Actions/viewActions';
import { Card, CardHeader, CardContent, Avatar, Container, Typography, Box } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function ViewProfile() {

    const styles = {
        container: {
            minWidth: "100vw",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '80vh',
        },
        card: {
            borderRadius: '10px',
            minWidth: '500px',
            maxWidth: '600px',
            backgroundImage: 'url(\"https://www.example.com/background-image.jpg\")',
            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.2)",
            '&:hover': {
                cursor: 'pointer',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
            },
            '&:not(:hover)': {
                transform: 'scale(1)',
                transition: 'transform 0.2s ease-in-out',
              },
        },
        avatar: {
            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.2)"
        },
        header: {
            backgroundColor: "#01CAB6",
        },
        data: {
            marginTop: "10px",
            marginBottom: "10px"
        },
        titleBox: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
        
    }

    const { viewUser } = useSelector((state) => state.view)
    const { name, lastName, email, profilePhoto, birthdayDate, nationality, phone, studies, gender, profession } = viewUser;

    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        dispatch(getUserById(id))
    }, [])

    return (
        <Container sx={styles.container}>
            <Card sx={styles.card}>
                <CardHeader
                    avatar={<Avatar sx={styles.avatar} src={profilePhoto} />}
                    title={<Box sx={styles.titleBox}><Typography>{`${name} ${lastName}`}</Typography><RadioButtonUncheckedIcon/></Box>}
                    sx={styles.header}
                />
                
                <CardContent>
                    <Typography variant='h5' sx={styles.data}>Correo electrónico: {email}</Typography>
                    <Typography variant='h5' sx={styles.data}>Teléfono: {phone}</Typography>
                    <Typography variant='h5' sx={styles.data}>Nacionalidad: {nationality}</Typography>
                    <Typography variant='h5' sx={styles.data}>Profesión: {profession}</Typography>
                    <Typography variant='h5' sx={styles.data}>Estudios: {studies}</Typography>
                    <Typography variant='h5' sx={styles.data}>Fecha de nacimiento: {birthdayDate}</Typography>
                    <Typography variant='h5' sx={styles.data}>Género: {gender}</Typography>
                </CardContent>
            </Card>
        </Container>
    )
}
