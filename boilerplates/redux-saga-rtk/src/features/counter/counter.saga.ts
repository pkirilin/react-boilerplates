import { all, call, put, takeEvery } from 'redux-saga/effects';
import api from './api';
import { setCount, setCountSuccess } from './counter.slice';

function sleep(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function* handleSetCount() {
  yield call(sleep, 1000);
  const count: number = yield call(api.getCount);
  yield put(setCountSuccess(count));
}

function* watchSetCount() {
  yield takeEvery(setCount.type, handleSetCount);
}

export default function* counterSaga(): Generator {
  yield all([watchSetCount()]);
}
