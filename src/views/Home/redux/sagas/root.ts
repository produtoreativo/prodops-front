import { fork } from 'redux-saga/effects';
import watchSave from './save';

export default function* rootSaga() {
  yield fork(watchSave);
}