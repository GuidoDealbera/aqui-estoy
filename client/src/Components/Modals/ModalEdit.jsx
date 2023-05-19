import { Modal, Box } from "@mui/material";
import EditForm from "./EditForm";
import { useSelector } from "react-redux";

export default function ModalEdit ({edit, handleClose, userID}){
    return (
        <Modal
          open={edit}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
           }}
        >
          <Box>
            <EditForm handleClose={handleClose} userID={userID}/>
          </Box>
        </Modal>
      
    );
}