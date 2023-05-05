import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { postSupervisorCharge , putSupervisorCharge} from '../../../../Redux/Actions/postPutActions';

const AssignSupervisor = () => {
  const dispatch = useDispatch();

  const { allSupervisors } = useSelector((state) => state.view);
  const { allCompanions } = useSelector((state) => state.view);

  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedCompanions, setSelectedCompanions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedCompanions([]);
    } else {
      setSelectAll(true);
      const allCompanionIds = allCompanions.map((companion) => companion.id);
      setSelectedCompanions(allCompanionIds);
    }
  };

  
  const assignCompanions = () => {
    if (selectedSupervisor) {
      if (selectedCompanions.length === 0) {
        alert('Selecciona al menos un acompañante');
      } else {
        dispatch(postSupervisorCharge(selectedSupervisor, selectedCompanions));
        console.log(
          `Acompañantes ${selectedCompanions.join(', ')} asignados al supervisor ${selectedSupervisor}`
        );
      }
    } else {
      console.log('Selecciona un supervisor');
    }
  };
  const putCompanions = () => {
    console.log(selectedSupervisor);
    console.log(selectedCompanions);
    
    if (selectedSupervisor) {
      if (selectedCompanions.length === 0) {
        alert('Selecciona al menos un acompañante');
      } else {
        dispatch(putSupervisorCharge(selectedSupervisor, selectedCompanions));
        console.log(
          `Acompañantes ${selectedCompanions.join(', ')} eliminados del supervisor ${selectedSupervisor}`
        );
      }
    } else {
      console.log('Selecciona un supervisor');
    }
  };


  return (
    <Box>
      <h2>Asignar Supervisor</h2>
      <Box marginBottom={2}>
        <FormControl fullWidth>
          <InputLabel>Supervisor</InputLabel>
          <Select
            value={selectedSupervisor}
            onChange={(e) => setSelectedSupervisor(e.target.value)}
            label="Supervisor"
          >
            <MenuItem value="">
              <em>Selecciona un supervisor</em>
            </MenuItem>
            {allSupervisors.map((supervisor) => (
              <MenuItem key={supervisor.id} value={supervisor.id}>
                {supervisor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box marginBottom={2}>
        <FormControl fullWidth>
          <InputLabel>Acompañantes</InputLabel>
          <Select
            multiple
            value={selectAll ? allCompanions.map((companion) => companion.id) : selectedCompanions}
            onChange={(e) => setSelectedCompanions(e.target.value)}
            label="Acompañante"
          >
            {allCompanions.map((companion) => (
              <MenuItem key={companion.id} value={companion.id}>
                {companion.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button onClick={handleSelectAll} variant="outlined"> Todos los acompañantes </Button> 
      <Button onClick={assignCompanions} variant="contained" color="primary"> Asignar Acompañantes a cargo </Button>
      <Button onClick={putCompanions} variant="contained" color="primary"> Eliminar Acompañantes a cargo </Button>

    </Box>
  );
};

export default AssignSupervisor;
