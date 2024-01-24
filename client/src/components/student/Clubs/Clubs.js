import React, { useEffect } from "react";
import Body from "./Body";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useDispatch } from "react-redux";
import { createClubAssessment } from "../../../redux/actions/studentActions";
import { getclub } from "../../../redux/actions/studentActions";
import { getClubAssesment } from "../../../redux/actions/studentActions";
const Clubs = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // change
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(
            getClubAssesment(
            user.result._id,
            user.result.email,
          )
        );
      }, [dispatch]);
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center">
      <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 ">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Clubs;