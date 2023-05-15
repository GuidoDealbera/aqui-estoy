import { Modal, Box } from "@mui/material";
import OnlineSupervisors from '../OnlineSupervisors/OnlineSupervisors';

export default function SupervisorsOnline ({edit, handleClose}){
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
            <OnlineSupervisors handleClose={handleClose} />
          </Box>
        </Modal>
    );
}