import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  postSupervisorCharge,
  putSupervisorCharge,
} from "../../../../Redux/Actions/postPutActions";
import { toast } from "sonner";
import { toastError } from "../../../../Redux/Actions/alertStyle";
import { getAllCompanions, getAllSupervisors } from "../../../../Redux/Actions/viewActions";


const AssignSupervisor = ({setActiveTab}) => {
  const dispatch = useDispatch();

  const { allSupervisors } = useSelector((state) => state.view);
  const { allCompanions } = useSelector((state) => state.view);

  const [selectedSupervisor, setSelectedSupervisor] = useState([]);
  const [selectedCompanions, setSelectedCompanions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [restCompanions, setRestCompanions]  = useState(false);


  useEffect(()=>{
    dispatch(getAllCompanions());
    dispatch(getAllSupervisors());
  },[selectedSupervisor])


  
  const handleSelectCompanion = (event) => {
    const selectedCompanionIds = event.target.value;
    setSelectedCompanions(selectedCompanionIds);

    if (selectedCompanionIds.length === allCompanions.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedCompanions([]);
    } else {
      setSelectAll(true);
      setRestCompanions(false);
      setSelectedCompanions(allCompanions.map((companion) => companion.id));
    }
  };
  const handleRestCompanions = () => {
    if (restCompanions) {
      setRestCompanions(false);
      setSelectedCompanions([]);
    } else {
      setRestCompanions(true);
      setSelectAll(false);
      const rest = allCompanions.filter((companion) => !companion.Supervisor);
      setSelectedCompanions(rest.map((companion) => companion.id));
      console.log(rest);
    }
  };
  
  
  
  

  const assignCompanions = () => {
    if (selectedSupervisor) {
      if (selectedCompanions.length === 0) {
        toast.error("Selecciona al menos un acompañante", toastError);
      } else {
        dispatch(postSupervisorCharge(selectedSupervisor, selectedCompanions));
        setSelectAll(false);
        setSelectedCompanions([]);
        setSelectedSupervisor([]);
    //    setActiveTab('assignSupervisor');
    //    window.location.reload();
        
     console.log(selectedSupervisor);
        console.log(selectedCompanions);
       
      }
    } else {
      toast.error("Selecciona un supervisor", toastError);
    }
  };

  const putCompanions = () => {
    if (selectedSupervisor) {
      if (selectedCompanions.length === 0) {
        toast.error("Selecciona al menos un acompañante", toastError);
      } else {
        dispatch(putSupervisorCharge(selectedSupervisor, selectedCompanions));
        setSelectedCompanions([]);
         setSelectedSupervisor([]);
        console.log(
          `Acompañantes ${selectedCompanions.join(
            ", "
          )} eliminados del supervisor ${selectedSupervisor}`
        );
      }
    } else {
      toast.error("Selecciona un supervisor", toastError);
    }
  };

  return (
    <Box>
      <Box marginBottom={2}>
        <Typography variant="h5" sx={{ textAlign: "center", margin: "2vw" }}>
          Asignar Referente
        </Typography>
        <Grid container justifyContent="center">
          <Grid item justifyContent="center" sx={{ width: "40vw" }}>
            Nota: Al seleccionar un Supervisor, por defecto muestra los acompañantes que tiene a su cargo. <br></br><br></br>
            <FormControl fullWidth>
              <InputLabel>Supervisor</InputLabel>
              <Select
                value={selectedSupervisor}
                onChange={(e) => {
                  const selectedSupervisorId = e.target.value;
                  setSelectedSupervisor(selectedSupervisorId);
                  setSelectAll(false);
                  setRestCompanions(false);
                  
                   console.log(selectedSupervisor);              
                  // Obtén los companions del supervisor seleccionado
                  const supervisor = allSupervisors.find(
                    (supervisor) => supervisor.id === selectedSupervisorId
                  );
                  if (supervisor) {
                    const supervisorCompanions = supervisor.Companions.map(
                      (companion) => companion.id
                    );
                 //   dispatch(getAllSupervisors());
                 //   dispatch(getAllCompanions());
                    setSelectedCompanions(supervisorCompanions);
                  } else {
                    setSelectedCompanions([]);
                  }
                }}
                label="Supervisor"
              >
                {/* ...opciones de supervisores */}
        
                <MenuItem value={[]}>
                  <em>Selecciona un supervisor</em>
                </MenuItem>
                {allSupervisors.map((supervisor) => {
                  if (supervisor.name && supervisor.isActive) {
                    return (
                      <MenuItem key={supervisor.id} value={supervisor.id}>
                        {supervisor.name} {supervisor.lastName}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box marginBottom={2}>
        <Grid container justifyContent="center">
          <Grid item justifyContent="center" sx={{ width: "40vw" }}>
            <FormControl fullWidth>
              <InputLabel>Acompañantes</InputLabel>
              <Select
    multiple
    value={
      selectAll
        ? allCompanions.map((companion) => companion.id)
        : selectedCompanions
    }
    onChange={handleSelectCompanion}
    label="Acompañante"
  >
    {allCompanions.map((companion) => {
      if (companion.name && companion.isActive) {
        const isSelected = selectedCompanions.includes(companion.id);
        return (
          <MenuItem
            key={companion.id}
            value={companion.id}
            style={isSelected ? { fontWeight: "bold" } : {}}
          >
            {companion.name} {companion.lastName}
          </MenuItem>
        );
      } else {
        return null;
      }
    })}
  </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Grid container justifyContent="center">
        <Grid item justifyContent="center" sx={{ width: "40vw" }}>
        <Button
  onClick={handleSelectAll}
  variant="outlined"
  sx={{
    marginRight: 1,
    backgroundColor: selectAll ? "#00C8B2" : "transparent",
    color: selectAll ? "white" : undefined,
    "&:hover": {
      backgroundColor: selectAll ? "#00C8B2" : "transparent",
    },
  }}
>
  Todos los acompañantes
</Button>


<Button
  onClick={handleRestCompanions}
  variant="outlined"
  sx={{
    marginRight: 1,
    backgroundColor: restCompanions ? "#00C8B2" : "transparent",
    color: restCompanions ? "white" : undefined,
    "&:hover": {
      backgroundColor: restCompanions ? "#00C8B2" : "transparent",
    },
  }}
>
  Acompañantes sin referente
</Button>

<br></br><br></br>
          <Button
            onClick={assignCompanions}
            variant="contained"
            color="primary"
            sx={{ margin: 1 }}
          >
            {" "}
            Asignar{" "}
          </Button>
          <Button
            onClick={putCompanions}
            variant="contained"
            color="primary"
            sx={{ margin: 1 }}
          >
            {" "}
            Eliminar{" "}
          </Button>{" "}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssignSupervisor;
