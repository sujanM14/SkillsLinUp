import {
  SET_ERRORS,
  UPDATE_PASSWORD,
  TEST_RESULT,
  STUDENT_LOGIN,
  UPDATE_STUDENT,
  GET_SUBJECT,
  UPDATE_ASSESSMENT,
  GET_SURVEY,
  ADD_CLUB_ASSESSMENT,
  GET_ClUB,
  GET_ClUB_Data,
} from "../actionTypes";
import * as api from "../api";

export const studentSignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.studentSignIn(formData);
    dispatch({ type: STUDENT_LOGIN, data });
    if (data.result.passwordUpdated) navigate("/student/home");
    else navigate("/student/password");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const studentUpdatePassword =
  (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.studentUpdatePassword(formData);
      dispatch({ type: UPDATE_PASSWORD, payload: true });
      alert("Password Updated");
      navigate("/student/home");
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const updateStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateStudent(formData);
    dispatch({ type: UPDATE_STUDENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getSubject = (department, year) => async (dispatch) => {
  try {
    const formData = {
      department,
      year,
    };
    const { data } = await api.getSubject(formData);
    dispatch({ type: GET_SUBJECT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getTestResult =
  (department, year) => async (dispatch) => {
    try {
      const formData = {
        department,
        year,
      };
      const { data } = await api.getTestResult(formData);
      dispatch({ type: TEST_RESULT, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };


  export const updateassesment = (formData) => async (dispatch) => {
    try {
      const { data } = await api.updateassesment(formData);
      dispatch({ type: UPDATE_ASSESSMENT, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
  
  export const getSurvey =
  (survey_id) => async (dispatch) => {
    try {
      const formData = {
        survey_id,
      };
      const { data } = await api.getSurvey(formData);
      dispatch({ type: GET_SURVEY, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
  
  // club assesment


export const createClubAssessment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createClubAssessment(formData);
    alert("Club Assessment Created Successfully");

    dispatch({ type: ADD_CLUB_ASSESSMENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getclub = () => async (dispatch) => {
  try {
    const { data } = await api.getclub();
    dispatch({ type: GET_ClUB, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
// getClubAssesment
export const getClubAssesment =
(student_id,email) => async (dispatch) => {
  try {
    const formData = {
      student_id,
      email,
    };
    const { data } = await api.getClubAssesment(formData);
    console.log(data);
    dispatch({ type: GET_ClUB_Data, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};