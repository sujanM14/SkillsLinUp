import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import Barchart from "./Barchart";
const Body = () => {
  const dispatch = useDispatch();
    const Clubs_data = useSelector((state) => state.student.club_data);
    //console.log(Clubs_data);


  return (
    <div className="flex flex-grow">
    <Barchart />
  </div>
  )
}

export default Body