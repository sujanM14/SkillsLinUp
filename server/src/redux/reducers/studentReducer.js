import {
  LOGOUT,
  STUDENT_LOGIN,
  UPDATE_STUDENT,
  UPDATE_PASSWORD,
  TEST_RESULT,
  UPDATE_ASSESSMENT,
  GET_SURVEY,
  ADD_CLUB_ASSESSMENT,
  GET_ClUB,
  GET_ClUB_Data,
} from "../actionTypes";

const initialState = {
  authData: null,
  updatedPassword: false,
  updatedStudent: false,
  testAdded: false,
  marksUploaded: false,
  addclubAssesment:false,
  testResult: [],
  tests: [],
  updatedAssesment: [],
  survey:[],
  clubs:[],
  club_data:[],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LOGIN:
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
    case UPDATE_STUDENT:
      return {
        ...state,
        updatedStudent: action.payload,
      };
    case TEST_RESULT:
      return {
        ...state,
        testResult: action.payload,
      };
      case UPDATE_ASSESSMENT:
        return {
          ...state,
          updateassesment: action.payload,
        };
        case GET_SURVEY:
          return {
            ...state,
            survey: action.payload,
          }; 
          case ADD_CLUB_ASSESSMENT:
      return {
        ...state,
        testAdded: action.payload,
      };
      case GET_ClUB:
      return {
        ...state,
        clubs: action.payload,
      };
      case GET_ClUB_Data:
      return {
        ...state,
        club_data: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
