import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { BATCH_GET_DETAILS, BATCH_GET_DETAILS_SUCCESS, BATCH_GET_DETAILS_ERROR, BATCH_SAVE } from "../actions";

import {
  batchGetDetails,
  batchGetDetailsSuccess,
  batchGetDetailsError,
  BatchSave
} from "./actions";


// const getTodoListRequest = async () => {
//   return await new Promise((success, fail) => {
//     setTimeout(() => {
//       success(todoData.data);
//     }, 1000);
//   })
//     .then(response => response)
//     .catch(error => error);
// };

// function* getTodoListItems() {
//   try {
//     const response = yield call(getTodoListRequest);
//     yield put(getTodoListSuccess(response));
//   } catch (error) {
//     yield put(getTodoListError(error));
//   }
// }

// const addTodoItemRequest = async item => {
//   let items = todoData.data;
//   item.id = items.length + 1;
//   item.createDate = getDateWithFormat();
//   items.splice(0, 0, item);
//   return await new Promise((success, fail) => {
//     setTimeout(() => {
//       success(items);
//     }, 1000);
//   })
//     .then(response => response)
//     .catch(error => error);
// };

// function* addTodoItem({ payload }) {
//   try {
//     const response = yield call(addTodoItemRequest, payload);
//     yield put(addTodoItemSuccess(response));
//   } catch (error) {
//     yield put(addTodoItemError(error));
//   }
// }

// export function* watchGetList() {
//   yield takeEvery(TODO_GET_LIST, getTodoListItems);
// }

// export function* wathcAddItem() {
//   yield takeEvery(TODO_ADD_ITEM, addTodoItem);
// }

export default function* rootSaga() {
//   yield all([fork(watchGetList), fork(wathcAddItem)]);
}
