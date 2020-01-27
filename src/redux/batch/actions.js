import {
   BATCH_GET_DETAILS,
   BATCH_GET_DETAILS_SUCCESS,
   BATCH_GET_DETAILS_ERROR,
   BATCH_SAVE,
   GET_TIME
  } from '../actions';
  
  export const batchGetDetails = () => ({
    type: BATCH_GET_DETAILS,
    payload: {  }
  });
  export const batchGetDetailsSuccess = () => ({
    type: BATCH_GET_DETAILS_SUCCESS,
    payload: {}
  });
  export const batchGetDetailsError = () => ({
    type: BATCH_GET_DETAILS_ERROR,
    payload: { }
  });
  
  export const BatchSave = () => ({
    type: BATCH_SAVE,
    payload: {  }
  });

  export const GetTime = (date) => ({
    type: GET_TIME,
    payload: { date }
  });
  