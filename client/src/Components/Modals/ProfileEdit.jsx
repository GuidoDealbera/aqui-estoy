import { Modal, Box } from "@mui/material";
import EditInfo from '../../Views/Register/EditInfo'

export default function ProfileEdit ({edit, handleClose}){
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
            <EditInfo handleClose={handleClose}/>
          </Box>
        </Modal>
      
    );
}