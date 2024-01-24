import express from "express";
import {
  studentLogin,
  updatedPassword,
  updateStudent,
  testResult,
  updateassesment,
  surveyData,
  createClubAssessment,
  getClub,
  getClubAssessment,
} from "../controller/studentController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", studentLogin);
router.post("/updatepassword", auth, updatedPassword);
router.post("/updateprofile", auth, updateStudent);
router.post("/testresult", auth, testResult);
router.post("/updateassesment", auth, updateassesment);
router.post("/survey", auth, surveyData);
router.post("/ClubAssesment", auth, createClubAssessment);
router.get("/getclub", auth, getClub);
router.post("/getClubAssesment", auth, getClubAssessment);
export default router;
