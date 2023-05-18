import { useState } from "react";
import { Modal, Button, Box, useTheme } from "@mui/material";
import LoginForm from "../LoginForm/LoginForm";


export default function ModalLogin ({handleMouseLeave, showLogin, setShowLogin}){
    const handleClose = () => {
      setShowLogin(false);
    };
    const theme = useTheme();
    return (
      <Box>
        <Modal
          open={showLogin}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
           }}
        >
          <Box sx={{ 
            backgroundColor: "white",
            [theme.breakpoints.down("sm")]: { width: 300 },
            [theme.breakpoints.up("sm")]: { width: 300 },
            height: "50%",
            borderRadius: "10px",
            padding: "1%",
            }}>
            <LoginForm handleMouseLeave={handleMouseLeave}/>
          </Box>
        </Modal>
      </Box>
    );
}