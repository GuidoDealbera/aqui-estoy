import { Modal, Box } from "@mui/material";
import EditForm from "./EditForm";
import { useSelector } from "react-redux";

export default function ModalEdit ({edit, handleClose, userID}){
    console.log(userID);
    return (
      <Box>
        <Modal
          open={edit}
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
            borderRadius: "5px",
            padding: "30px",
            }}>
            <EditForm userID={userID}/>
          </Box>
        </Modal>
      </Box>
    );
}