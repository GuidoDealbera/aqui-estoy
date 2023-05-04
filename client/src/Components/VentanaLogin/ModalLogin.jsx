import { useState } from "react";
import { Modal, Button, Box } from "@mui/material";
import LoginForm from "../LoginForm/LoginForm";


export default function ModalLogin ({handleMouseLeave, showLogin, setShowLogin}){
    const handleClose = () => {
      setShowLogin(false);
    };
  
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
            width: 400,
            height: "40%",
            borderRadius: "5px",
            padding: "30px",
            }}>
            <LoginForm handleMouseLeave={handleMouseLeave}/>
          </Box>
        </Modal>
      </Box>
    );
}