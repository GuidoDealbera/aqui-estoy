import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { getSupervisorsOnline } from "../../Redux/Actions/viewActions";

export default function OnlineSupervisors(props) {
  const { user, supervisorsOnline, loading } = useSelector((state) => state.auth);
  const { CityTimeZone } = user;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(supervisorsOnline);
    dispatch(getSupervisorsOnline(CityTimeZone));
  }, [dispatch, user]);
  return !loading ? (
  <Box>
  {supervisorsOnline.Supervisors.map(sol => {
    return (
        <Typography variant="h4" key={sol.id}>{sol.name}{sol.lastName}</Typography>
    )
  })}
  </Box>
  ) : (
  <Loader />
  );
}
