import { Modal, Box, Button } from "@mui/material";
import OnlineSupervisors from '../OnlineSupervisors/OnlineSupervisors';

export default function SupervisorsOnline ({open, closeOpen}){
    return (
        <Box>
        <Modal
          open={open}
          onClose={closeOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
           }}
        >
          <Box>
            <OnlineSupervisors onClose={closeOpen}/>
          </Box>
        </Modal>
        </Box>
    );
}