import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTestResult } from "../../../redux/actions/studentActions";
import { getSurvey } from "../../../redux/actions/studentActions";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Body from "./Body";

const Performanceresult = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getTestResult(
        user.result.marks,
        
      )
    );
  }, [dispatch]);
  const dispatch1 = useDispatch();
  useEffect(() => {
    dispatch(
      getSurvey(
        user.result.survey[0],
      )
    );
  }, [dispatch1])
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center">
      <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-y-hidden">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Performanceresult;