import { Modal, Box, Button } from "@mui/material";
import OnlineSupervisors from '../OnlineSupervisors/OnlineSupervisors';

export default function SupervisorsOnline ({open, closeOpen}){
    return (  
        <Modal
          open={open}
          onClose={closeOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
           }}
        >
          <Box sx={{display: "flex", justifyContent: "center", width: "450px"}}>
            <OnlineSupervisors onClose={closeOpen}/>
          </Box>
        </Modal>
    );
}