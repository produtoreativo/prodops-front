import { takeLatest, put } from "redux-saga/effects";
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
})
/*
function * prepare(action: any) {
  try {
    const { data: payload } = yield instance.get('/search');
    yield put({
      type: 'SUCCESS',
      payload,
      meta: action.meta,
    })
  } catch (payload) {
    yield put({
      type: 'GLOBAL_ERROR',
      payload,
    })
  }

}
*/

export default function* watchSave() {
  //yield takeLatest('SEARCH', prepare)
}