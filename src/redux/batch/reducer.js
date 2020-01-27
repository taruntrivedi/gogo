import {
  BATCH_GET_DETAILS,
  BATCH_GET_DETAILS_SUCCESS,
  BATCH_GET_DETAILS_ERROR,
  BATCH_SAVE,
  GET_TIME
} from "../actions";

const INIT_STATE = {
  date: new Date(),
  batchData: "",
  waiting: true,
  teacherData: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case BATCH_GET_DETAILS:
      return { ...state };
    case BATCH_GET_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload.uid, error: "" };
    case BATCH_GET_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case BATCH_SAVE:
      return { ...state, loading: true, error: "" };
    case GET_TIME:
        return{
            ...state,
            date: action.payload.date
        }
    default:
      return { ...state };
  }
};
