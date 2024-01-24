import {
  ADD_TEST,
  FACULTY_LOGIN,
  GET_TEST,
  LOGOUT,
  MARKS_UPLOADED,
  UPDATE_FACULTY,
  UPDATE_PASSWORD,
  GET_SURVEY,
} from "../actionTypes";

const initialState = {
  authData: null,
  updatedPassword: false,
  updatedFaculty: false,
  testAdded: false,
  marksUploaded: false,
  tests: [],
  survey:[],
};

const facultyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FACULTY_LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case UPDATE_PASSWORD:
      return {
        ...state,
        updatedPassword: action.payload,
      };
    case UPDATE_FACULTY:
      return {
        ...state,
        updatedFaculty: action.payload,
      };
    case ADD_TEST:
      return {
        ...state,
        testAdded: action.payload,
      };
    case GET_TEST:
      return {
        ...state,
        tests: action.payload,
      };
    case MARKS_UPLOADED:
      return {
        ...state,
        marksUploaded: action.payload,
      };
      case GET_SURVEY:
        return {
          ...state,
          survey: action.payload,
        };
    default:
      return state;
  }
};

export default facultyReducer;
